import AccountRepository from "../repositories/account.repository";

export default class AccountService {
    private _accountRepository: AccountRepository = new AccountRepository();
    async signup(body:any) {
        return this._accountRepository.addAccount(body);
    }
}