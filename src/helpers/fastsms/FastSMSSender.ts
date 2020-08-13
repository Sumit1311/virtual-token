import BaseSMSSender, { ISMS } from "../sms/SMSSender";
import { getEnvValue } from "../env";
import { EnvVarTypeEnum } from "../../enums/EnvVarTypeEnum";
import axios from "axios";

export default class FastSMSSender implements BaseSMSSender {

    authKey: string = <string>getEnvValue(EnvVarTypeEnum.FastSMSAuthKey);

    async send(data: ISMS) {
        const callResponse = await axios.get("https://www.fast2sms.com/dev/bulk", {
            params: {
                authorization: this.authKey,
                "sender_id": "FSTSMS",
                "message": `${data.body}`,
                "language": "english",
                "route": "p",
                "numbers": `${data.to}`
            }
        });
        return callResponse;
    }
}