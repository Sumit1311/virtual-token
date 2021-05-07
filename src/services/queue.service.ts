import { IAccount } from "../database/models/account";
import { IQueue } from "../database/models/queue";
import QueueRepository from "../repositories/queue.repository";
import moment, { MomentInputObject } from "moment";
import constants from "../constants";
import AccountRepository from "../repositories/account.repository";

export default class QueueService {
    private _queueRepository: QueueRepository = new QueueRepository();
    private _accountRepository: AccountRepository = new AccountRepository();

    async add() {
        
    }

    async allotSlotInQueue(queueRecord: IQueue, accountRecord: IAccount) {
        queueRecord.accountId = accountRecord.accountId;
        accountRecord.lastToken++;
        let slot = getCurrentSlot(accountRecord);
        if (slot === -1) {
            throw new Error(constants.SLOT_FULL);
        }
        queueRecord.token = accountRecord.lastToken;
        let allotedSlot = currentSlotToMoment(accountRecord, slot);
        queueRecord.allotedSlot.from = allotedSlot.from;
        queueRecord.allotedSlot.to = allotedSlot.to;
        const queue = await this._queueRepository.addToQueue(queueRecord);
        if (queue.queueId === queueRecord.queueId) {
            accountRecord = await this._accountRepository.incrementLastToken(accountRecord);
        }
        let assignedToken = queue.token;
        allotedSlot.from = <number>queue.allotedSlot.from
        allotedSlot.to = <number>queue.allotedSlot.to;
        return { allotedSlot, assignedToken }
    }
}

function getCurrentSlot(account: IAccount) {
    let currentDate = moment().utc().startOf('day').valueOf();
    if (account.currentDate !== currentDate) {
        account.currentDate = currentDate;
        account.lastToken = 1;
        account.slotCount.splice(0, account.slotCount.length);
    }
    return calculateAssignedSlot(account);
}

function calculateAssignedSlot(account: IAccount) {
    let activeSlot = getActiveSlot(account);
    let totalSlots = getTotalSlotsInDay(account);

    while ((account.slotCount[activeSlot - 1] !== undefined) &&
        (account.slotCount[activeSlot - 1] >= account.customersPerSlot)) {
        activeSlot++;
    }

    if (activeSlot > totalSlots) {
        return -1;
    } else {
        if (account.slotCount[activeSlot - 1] === undefined) {
            account.slotCount[activeSlot - 1] = 0;
        }
        account.slotCount.set(activeSlot - 1, <number>(account.slotCount[activeSlot - 1] ? account.slotCount[activeSlot - 1] : 0) + 1);

        return activeSlot;
    }
}

function getActiveSlot(account: IAccount) {
    let currentMoment = moment().utc().utcOffset("+05:30");
    let fromMoment = moment(currentMoment).startOf("day")
        .add(<MomentInputObject>account.dailyTiming.from);
    let minutesPassed = currentMoment.diff(fromMoment, "minutes");
    if (minutesPassed > 0) {
        return Math.ceil((minutesPassed / account.slotDuration.minutes));
    } else {
        return 1;
    }
}

function getTotalSlotsInDay(account: IAccount) {
    let fromMoment = moment().utc().utcOffset("+05:30").startOf("day")
        .add(account.dailyTiming.from as MomentInputObject);

    let toMoment = moment().utc().utcOffset("+05:30").startOf("day")
        .add(account.dailyTiming.to as MomentInputObject);

    let minutesPassed = toMoment.diff(fromMoment, "minutes");
    let numberOfSlots = Math.ceil(minutesPassed / account.slotDuration.minutes);
    return numberOfSlots;

}

function currentSlotToMoment(account: IAccount, slot: number) {
    let duration: MomentInputObject = { minutes: account.slotDuration.minutes * (slot - 1) };

    let momentForSlot = moment().utc().utcOffset("+05:30").startOf("day")
        .add(account.dailyTiming.from as MomentInputObject)
        .add(duration);

    let endMomentForSlot = moment(momentForSlot)
        .add(account.slotDuration.minutes, "minutes");

    let toMoment =
        moment().utc().utcOffset("+05:30").startOf("day")
            .add(<MomentInputObject>account.dailyTiming.to);

    if (endMomentForSlot.diff(toMoment) > 0) {
        endMomentForSlot = toMoment;
    }

    return {
        from: momentForSlot.valueOf(),
        to: endMomentForSlot.valueOf()
    };
}