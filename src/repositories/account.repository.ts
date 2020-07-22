import AccountModel, { IAccount, ICustomer } from "../database/models/account";
import constants from "../constants";

export default class AccountRepository {
    async addCustomer(accountDoc: IAccount) {
        let account = await this._getAccountByPhoneNumber(accountDoc);
        if (!account) {
            throw new Error();
        }
        account.lastToken ? (account.lastToken)++ : account.lastToken = 1;
        accountDoc.customers[0].token = account.lastToken;
        account.customers.push(accountDoc.customers[0]);
        return account.save();
    }

    async addAccount(accountDoc: IAccount) {
        let account = await this._getAccountByPhoneNumber(accountDoc);
        if (account) {
            throw new Error(constants.PHONE_NUMBER_ALREADY_ADDED);
        } else {
            return accountDoc.save();
        }
    }

    async findAccountByAccountId(accountDoc: IAccount) {
        let account = this._getAccountByAccountId(accountDoc)
        if (account == null) {
            throw new Error();
        } else {
            return account;
        }
    }

    private async _getAccountByPhoneNumber(account: IAccount, projection: any = null) {
        let accountRecord = await AccountModel.findOne({
            phoneNumber: account.phoneNumber
        }, projection);
        return accountRecord;
    }

    private async _getAccountByAccountId(account: IAccount, projection: any = null, options: any = null) {
        let accountRecord = await AccountModel.findOne({ accountId: account.accountId }, projection, options);
        return accountRecord;
    }

    async getCustomers(account: IAccount) {
        let result = await this._getAccountByAccountId(account);
        if (result === null) {
            throw new Error(constants.INVALID_ACCOUNT_ID);
        }
        this.sortCustomersByToken(result);
        this.filterActiveCustomers(result);
        return result;
    }

    async deleteFrontCustomer(account: IAccount, index: number) {
        return AccountModel.findOneAndUpdate({
            accountId: account.accountId
        }, {
            $set: {
                "customers.$[customer].active": false
            }
        }, {
            arrayFilters: [{
                "customer._id": account.customers[index]._id
            }]
        })
    }

    filterActiveCustomers(account: IAccount) {
        let customers = account.customers.filter((v) => {
            return (v.active === true)
        });
        account.customers = customers;
    }
    sortCustomersByToken(account: IAccount) {
        account.customers.sort((a: ICustomer, b: ICustomer) => {
            return (a.token - b.token);
        });
    }
}