import TwilioSubAccountHelper from "../../helpers/twilio/SubAccount";
import ITwilioSubAccount from "../../helpers/twilio/ISubAccount";
import { IAccount } from "../../database/models/account";
import { getEnvValue } from "../../helpers/env";
import { EnvVarTypeEnum } from "../../enums/EnvVarTypeEnum";

export default class TwilioSubAccountRepository {
    private _twilioSubAccountHelper: TwilioSubAccountHelper;
    private _parentAccountSid: string = <string>getEnvValue(EnvVarTypeEnum.TwilioAccountSid);
    private _parentAuthKey: string = <string>getEnvValue(EnvVarTypeEnum.TwilioAuthKey);

    constructor() {
        this._twilioSubAccountHelper = new TwilioSubAccountHelper(<ITwilioSubAccount>{
            sid: this._parentAccountSid,
            authToken: this._parentAuthKey
        });
    }
    async add(account: IAccount) {
        let result = await this._twilioSubAccountHelper.create(account.phoneNumber);
        //account.sid = result.sid;
        //account.authToken = result.authToken;
        account.sid = this._parentAccountSid;
        account.authToken = this._parentAuthKey;
        account.parentSid = this._parentAccountSid;
        account.parentAuthToken = this._parentAuthKey;
        account.lastToken = 0;
        return account;
    }
}