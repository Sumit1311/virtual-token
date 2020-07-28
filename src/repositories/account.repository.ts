import AccountModel, { IAccount } from "../database/models/account";
import constants from "../constants";

export default class AccountRepository {
    async incrementLastToken(accountDoc: IAccount) {
        let account = await this._getAccountByMissedCallNumber(accountDoc);
        if (!account) {
            throw new Error();
        }
        account.lastToken ? (account.lastToken)++ : account.lastToken = 1;
        return await account.save();
    }

    async addAccount(accountDoc: IAccount) {
        let account = await this._getAccountByMissedCallNumber(accountDoc);
        if (account) {
            throw new Error(constants.PHONE_NUMBER_ALREADY_ADDED);
        } else {
            return await accountDoc.save();
        }
    }

    async findAccountByAccountId(accountDoc: IAccount) {
        let account = await this._getAccountByAccountId(accountDoc)
        if (account == null) {
            throw new Error(constants.INVALID_ACCOUNT_ID);
        } else {
            return account;
        }
    }

    async findAccountByMissedCallNumber(accountDoc: IAccount) {
        let account = await this._getAccountByMissedCallNumber(accountDoc)
        if (account == null) {
            throw new Error(constants.INVALID_ACCOUNT_ID);
        } else {
            return account;
        }
    }


    private async _getAccountByMissedCallNumber(account: IAccount, projection: any = null) {
        let accountRecord = await AccountModel.findOne({
            missedCallNumber: account.missedCallNumber
        }, projection);
        return accountRecord;
    }

    private async _getAccountByAccountId(account: IAccount, projection: any = null, options: any = null) {
        let accountRecord = await AccountModel.findOne({ accountId: account.accountId }, projection, options);
        return accountRecord;
    }
}