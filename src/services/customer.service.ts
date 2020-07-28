import TwilioVoiceRepository from "../repositories/twilio/voice.repository";
import TwilioSMSRepository from "../repositories/twilio/sms.repository";
import QueueRepository from "../repositories/queue.repository";
import AccountRepository from "../repositories/account.repository";
import CallCustomerDTO from "../dto/CallCustomerDTO";
import toAccountSchema from "../database/schemas/toAccountSchema";
import toQueueSchema from "../database/schemas/toQueueSchema";
import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";
import ITwilioCall from "../helpers/twilio/ICall";
import { getCallingPrefix } from "../helpers";
import ITwilioSms from "../helpers/twilio/ISms";
import GetCustomersDTO from "../dto/GetCustomersDTO";

export default class CustomerService {
    private _voiceRepository: TwilioVoiceRepository = new TwilioVoiceRepository();
    private _smsRepository: TwilioSMSRepository = new TwilioSMSRepository();
    private _queueRepository: QueueRepository = new QueueRepository();
    private _accountRepository: AccountRepository = new AccountRepository();

    async call(body: CallCustomerDTO) {
        let accountRecord = await this._accountRepository.findAccountByAccountId(toAccountSchema(body))
        let queue = await this._queueRepository.getQueue(toQueueSchema(body));
        let isCallConfigured = accountRecord.notificationTypes & NotificationTypeEnum.call;
        let isSmsConfigured = accountRecord.notificationTypes & NotificationTypeEnum.sms;
        //const limit: number = <number>getEnvValue(EnvVarTypeEnum.CallBatchSize);
        const limit: number = accountRecord.callBatchSize;
        for (let i = 0; (i < queue.length) && (i < limit); i++) {
            if (isCallConfigured) {
                await this._voiceRepository.callCustomer(<ITwilioCall>{
                    sid: accountRecord.sid,
                    authToken: accountRecord.authToken,
                    from: accountRecord.callingNumber,
                    to: getCallingPrefix(queue[i].channel) + queue[i].mobileNo
                });
            }
            if (isSmsConfigured) {
                await this._smsRepository.sendSmsToCustomer(<ITwilioSms>{
                    sid: accountRecord.sid,
                    authToken: accountRecord.authToken,
                    from: accountRecord.callingNumber,
                    to: getCallingPrefix(queue[i].channel) + queue[i].mobileNo
                });
            }
            await this._queueRepository.removeFromQueue(queue[i]);
        };
        return {};
    }

    async getCustomers(data: GetCustomersDTO) {
        let queue = await this._queueRepository.getQueue(toQueueSchema(data));
        return queue;
    }
}