import AccountRepository from "../repositories/account.repository";
import AddAccountDTO from "../dto/AddAccountDTO";
import toAccountSchema from "../database/schemas/toAccountSchema";
import TwilioSubAccountRepository from "../repositories/twilio/subaccount.repository";
import CallCustomerDTO from "../dto/CallCustomerDTO";
import TwilioVoiceRepository from "../repositories/twilio/voice.repository";
import ITwilioCall from "../helpers/twilio/ICall";

export default class AccountService {
    private _accountRepository: AccountRepository = new AccountRepository();
    private _subAccountRepository: TwilioSubAccountRepository = new TwilioSubAccountRepository();
    private _voiceRepository: TwilioVoiceRepository = new TwilioVoiceRepository();
    private _maxCallCount: number = parseInt(process.env.MAX_CALL_COUNT || "3");

    async add(body: AddAccountDTO) {
        let account = toAccountSchema(body);
        //account = await this._subAccountRepository.add(account);
        return this._accountRepository.addAccount(account);
    }

    async call(body: CallCustomerDTO) {
        const account = toAccountSchema(body);
        const { number: limit } = body;
        const accountRecord = await this._accountRepository.getCustomers(account, { limit });
        for (let customer of accountRecord.customers) {
            await this._voiceRepository.callCustomer(<ITwilioCall>{
                sid: accountRecord.sid,
                authToken: accountRecord.authToken,
                from: accountRecord.phoneNumber,
                to: customer.mobileNo
            });
            await this._accountRepository.deleteFrontCustomer(accountRecord);
        };
    }
}