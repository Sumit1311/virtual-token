import AccountRepository from "../repositories/account.repository";
import UserRepository from "../repositories/user.repository";
import AddAccountDTO from "../dto/AddAccountDTO";
import toAccountSchema from "../database/schemas/toAccountSchema";
import TwilioSubAccountRepository from "../repositories/twilio/subaccount.repository";
import SignupDTO from "../dto/SignupDTO";
import toUserSchema from "../database/schemas/toUserSchema";
import UpdateAccountDTO from "../dto/UpdateAccountDTO";
import GetAccountDTO from "../dto/GetAccountDTO";
import EmailRepository from "../repositories/email.repository";
import { IAccount } from "../database/models/account";

export default class AccountService {
    private _accountRepository: AccountRepository = new AccountRepository();
    private _userRepository: UserRepository = new UserRepository();
    private _subAccountRepository: TwilioSubAccountRepository = new TwilioSubAccountRepository();
    private _emailRepository: EmailRepository = new EmailRepository();

    async add(body: AddAccountDTO) {
        let account = toAccountSchema(body);
        //account = await this._subAccountRepository.add(account);
        return this._accountRepository.addAccount(account);
    }

    async signup(body: SignupDTO) {
        let user = await toUserSchema(body);
        await this._userRepository.checkUsername(user);
        let account = await this._accountRepository.signup(toAccountSchema(body));
        user.accountId = account.accountId;
        await this._emailRepository.sendNewRegistrationEmail({
            name: body.orgName,
            mobileNo: body.mobileNo
        })
        return await this._userRepository.add(user);
    }

    async update(body: UpdateAccountDTO) {
        let account = await this._accountRepository.update(toAccountSchema(body));
        return account;
    }

    async getAccount(body: GetAccountDTO) {
        let account = await this._accountRepository.findAccountByAccountId(toAccountSchema(body))
        return account;
    }
}