import WebhooksRepository from "../repositories/webhooks.repository";
import EnqueueCustomerDTO from "../dto/EnqueueCustomerDTO";
import AccountRepository from "../repositories/account.repository";
import toAccountSchema from "../database/schemas/toAccountSchema";
import toQueueSchema from "../database/schemas/toQueueSchema";
import constants from "../constants";
import FastSMSSender from "../helpers/fastsms/FastSMSSender";
import { ISMS } from "../helpers/sms/SMSSender";
import QueueService from "./queue.service";

export default class WebhooksService {
    private _webhooksRepository: WebhooksRepository = new WebhooksRepository();
    private _accountRepository: AccountRepository = new AccountRepository();
    private _queueService: QueueService = new QueueService();

    constructor() {
    }

    async enqueue(body: EnqueueCustomerDTO) {
        if (body.channel === constants.MYOPERATOR && body.department !== constants.APPOINTMENT_DEPARTMENT) {
            return "";
        }
        let account = toAccountSchema(body);

        let accountRecord = await this._accountRepository.findAccountByMissedCallNumber(account);
        const queueRecord = toQueueSchema(body);
        let { allotedSlot, assignedToken } = await this._queueService.allotSlotInQueue(queueRecord, accountRecord);
        let enqueResponse = this._webhooksRepository.getEnqueueResponse({
            channel: body.channel,
            assignedToken,
            allotedSlot
        });

        if (body.channel === constants.MYOPERATOR || body.channel === constants.MISSEDDIAL) {
            let sender = new FastSMSSender()
            await sender.send(<ISMS>{
                to: body.mobileNo,
                body: enqueResponse.response
            });
        }

        return enqueResponse

    }
}