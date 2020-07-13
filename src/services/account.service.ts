import AccountRepository from "../repositories/account.repository";
import AddAccountDTO from "../dto/AddAccountDTO";
import toAccountSchema from "../database/schemas/toAccountSchema";
import TwilioSubAccountRepository from "../repositories/twilio/subaccount.repository";

export default class AccountService {
    private _accountRepository: AccountRepository = new AccountRepository();
    private _subAccountRepository: TwilioSubAccountRepository = new TwilioSubAccountRepository();
    async add(body: AddAccountDTO) {
        let account = toAccountSchema(body);
        //account = await this._subAccountRepository.add(account);
        return this._accountRepository.addAccount(account);
    }
}
