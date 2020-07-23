import AccountRepository from "../repositories/account.repository";
import AddAccountDTO from "../dto/AddAccountDTO";
import toAccountSchema from "../database/schemas/toAccountSchema";
import TwilioSubAccountRepository from "../repositories/twilio/subaccount.repository";
import CallCustomerDTO from "../dto/CallCustomerDTO";
import TwilioVoiceRepository from "../repositories/twilio/voice.repository";
import ITwilioCall from "../helpers/twilio/ICall";
import { getCallingPrefix } from "../helpers";
import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";
import TwilioSMSRepository from "../repositories/twilio/sms.repository";
import ITwilioSms from "../helpers/twilio/ISms";

export default class AccountService {
    private _accountRepository: AccountRepository = new AccountRepository();
    private _subAccountRepository: TwilioSubAccountRepository = new TwilioSubAccountRepository();
    private _voiceRepository: TwilioVoiceRepository = new TwilioVoiceRepository();
    private _smsRepository: TwilioSMSRepository = new TwilioSMSRepository();

    async add(body: AddAccountDTO) {
        let account = toAccountSchema(body);
        //account = await this._subAccountRepository.add(account);
        return this._accountRepository.addAccount(account);
    }

    async call(body: CallCustomerDTO) {
        const account = toAccountSchema(body);
        let accountRecord = await this._accountRepository.getCustomers(account);
        let isCallConfigured = accountRecord.notificationTypes & NotificationTypeEnum.call;
        let isSmsConfigured = accountRecord.notificationTypes & NotificationTypeEnum.sms;
        //const limit: number = <number>getEnvValue(EnvVarTypeEnum.CallBatchSize);
        const limit: number = accountRecord.callBatchSize;
        for (let i = 0; (i < accountRecord.customers.length) && (i < limit); i++) {
            if (isCallConfigured) {
                await this._voiceRepository.callCustomer(<ITwilioCall>{
                    sid: accountRecord.sid,
                    authToken: accountRecord.authToken,
                    from: accountRecord.phoneNumber,
                    to: getCallingPrefix(accountRecord.customers[i].channel) + accountRecord.customers[i].mobileNo
                });
            }
            if (isSmsConfigured) {
                await this._smsRepository.sendSmsToCustomer(<ITwilioSms>{
                    sid: accountRecord.sid,
                    authToken: accountRecord.authToken,
                    from: accountRecord.phoneNumber,
                    to: getCallingPrefix(accountRecord.customers[i].channel) + accountRecord.customers[i].mobileNo
                });
            }
            await this._accountRepository.deleteFrontCustomer(accountRecord, i);
        };
        return {};
    }
}