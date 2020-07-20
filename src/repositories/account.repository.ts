import AccountModel, { IAccount } from "../database/models/account";

export default class AccountRepository {
    async addCustomer(accountDoc: IAccount) {
        let account = await this._getAccountBySid(accountDoc);
        if (!account) {
            throw new Error();
        }
        account.lastToken ? (account.lastToken)++ : account.lastToken = 1;
        accountDoc.customers[0].token = account.lastToken;
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

    async findAccountBySid(accountDoc: IAccount, projection: any = null) {
        let account = await this._getAccountBySid(accountDoc, projection);
        if (account == null) {
            throw new Error();
        } else {
            return account;
        }
    }

    private async _getAccountBySid(account: IAccount, projection: any = null) {
        let accountRecord = await AccountModel.findOne({
            sid: account.sid
        }, projection);
        return accountRecord;
    }

    async getCustomers(account: IAccount, { limit }: any) {
        return await this.findAccountBySid(account, {
            customers: {
                $slice: limit
            }
        });
    }

    async deleteFrontCustomer(account: IAccount) {
        account.customers.shift();
        return await account.save();
    }
}