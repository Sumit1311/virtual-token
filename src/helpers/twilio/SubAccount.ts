import TwilioClient from "./client";
import { AccountListInstance } from "twilio/lib/rest/api/v2010/account";
import ITwilioSubAccount from "./ISubAccount";

export default class TwilioSubAccountHelper {
    private _accounts: AccountListInstance;

    constructor(account: ITwilioSubAccount) {
        this._accounts = (new TwilioClient(account.sid, account.authToken)).api.accounts;
    }

    async create(name: string) {
        const account = await this._accounts.create({ friendlyName: name });
        return <ITwilioSubAccount>{
            sid: account.sid,
            authToken: account.authToken
        }
    }
}