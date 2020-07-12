import AccountModel, { IAccount } from "../database/models/account";

export default class AccountRepository {
    async addCustomer(accountDoc: IAccount) {
        let account = await this._getAccountBySid(accountDoc);
        if (!account) {
            throw new Error();
        }
        account.customers.push(accountDoc.customers[0]);
        return account.save();
    }

    async addAccount(accountDoc: IAccount) {
        let account = await this._getAccountBySid(accountDoc);
        if (account) {
            throw new Error();
        } else {
            return accountDoc.save();
        }
    }

    async findAccountBySid(accountDoc: IAccount) {
        let account = this._getAccountBySid(accountDoc);
        if (account) {
            throw new Error();
        } else {
            return account;
        }
    }

    private async _getAccountBySid(account: IAccount) {
        let accountRecord = await AccountModel.findOne({
            sid: account.sid
        });
        return accountRecord;
    }
}