import AccountModel, { IAccount } from "../database/models/account";
import constants from "../constants";

export default class AccountRepository {
    async incrementLastToken(accountDoc: IAccount) {
        //account.lastToken ? (account.lastToken)++ : account.lastToken = 1;
        return await accountDoc.save();
    }

    async addAccount(accountDoc: IAccount) {
        let account = await this._getAccountByMissedCallNumber(accountDoc);
        if (account) {
            throw new Error(constants.PHONE_NUMBER_ALREADY_ADDED);
        } else {
            return await accountDoc.save();
        }
    }

    async signup(accountDoc: IAccount) {
        let account = await this._getAccountByName(accountDoc);
        if (account) {
            throw new Error(constants.ORGANISATION_NAME_EXISTS);
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

    async update(accountDoc: IAccount) {
        let account = await this._getAccountByAccountId(accountDoc)
        if (account == null) {
            throw new Error(constants.INVALID_ACCOUNT_ID);
        } else {
            if (accountDoc.dailyTiming) {
                account.dailyTiming = accountDoc.dailyTiming;
            }
            if (accountDoc.slotDuration) {
                account.slotDuration = accountDoc.slotDuration;
            }
            if (accountDoc.customersPerSlot) {
                account.customersPerSlot = accountDoc.customersPerSlot;
            }
            return await account.save();
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

    private async _getAccountByName(account: IAccount, projection: any = null) {
        let accountRecord = await AccountModel.findOne({
            name: account.name
        }, projection);
        return accountRecord;
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