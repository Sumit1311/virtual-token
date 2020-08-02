import WebhooksRepository from "../repositories/webhooks.repository";
import AddCustomerDTO from "../dto/AddCustomerDTO";
import AccountRepository from "../repositories/account.repository";
import toAccountSchema from "../database/schemas/toAccountSchema";
import QueueRepository from "../repositories/queue.repository";
import toQueueSchema from "../database/schemas/toQueueSchema";
import moment, { Moment, MomentInputObject } from "moment";
import { IAccount, ICurrentSlot } from "../database/models/account";

export default class WebhooksService {
    private _webhooksRepository: WebhooksRepository = new WebhooksRepository();
    private _accountRepository: AccountRepository = new AccountRepository();
    private _queueRepository: QueueRepository = new QueueRepository();

    constructor() {
    }

    async enqueue(body: AddCustomerDTO) {
        let account = toAccountSchema(body);
        let assignedToken;
        let accountRecord = await this._accountRepository.findAccountByMissedCallNumber(account);
        const queueRecord = toQueueSchema(body);
        queueRecord.accountId = accountRecord.accountId;
        accountRecord.lastToken++;
        queueRecord.token = accountRecord.lastToken;
        let allotedSlot = currentSlotToMoment(accountRecord, getCurrentSlot(accountRecord));
        queueRecord.allotedSlot.from = allotedSlot.from;
        queueRecord.allotedSlot.to = allotedSlot.to;
        const queue = await this._queueRepository.addToQueue(queueRecord);
        if (queue.queueId === queueRecord.queueId) {
            accountRecord = await this._accountRepository.incrementLastToken(accountRecord);
        }
        assignedToken = queue.token;
        allotedSlot.from = <number>queue.allotedSlot.from
        allotedSlot.to = <number>queue.allotedSlot.to;
        return this._webhooksRepository.getEnqueueResponse({
            channel: body.channel,
            assignedToken,
            allotedSlot
        });
    }
}

function getCurrentSlot(account: IAccount) {
    if (account.currentSlot === null || account.currentSlot === undefined) {
        account.currentSlot = getCurrentSlotAtStart(account);
        return 1;
    } else {
        let currentSlot = account.currentSlot;
        let dateMoment = moment(currentSlot.date);
        if (dateMoment.get("date") === moment().utc().get("date")) {
            let numberOfTokensAssignedToday = ((account.lastToken) - currentSlot.startToken);
            let slot = Math.ceil(numberOfTokensAssignedToday / account.customersPerSlot);
            (numberOfTokensAssignedToday % account.customersPerSlot) === 0 ? slot++ : slot;
            return slot;
        } else {
            account.currentSlot = getCurrentSlotAtStart(account);
            return 1;
        }
    }
}

function getCurrentSlotAtStart(account: IAccount) {
    let currentSlot: ICurrentSlot = {
        date: moment.utc().valueOf(),
        startToken: account.lastToken
    }
    return currentSlot;
}

function currentSlotToMoment(account: IAccount, slot: number) {
    let momentForSlot = moment()
        .utc()
        .utcOffset("+05:30")
        .startOf("day")
        .add(<MomentInputObject>account.dailyTiming.from)
        .add(account.slotDuration.minutes * (slot - 1), "minutes");

    return {
        from: momentForSlot.valueOf(),
        to: momentForSlot.add(account.slotDuration.minutes, "minutes").valueOf()
    };
}