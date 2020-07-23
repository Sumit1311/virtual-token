import { EnvVarTypeEnum } from "../../enums/EnvVarTypeEnum";

export function getEnvValue(variable: EnvVarTypeEnum) {
    switch (variable) {
        case EnvVarTypeEnum.MongodbUri:
            return process.env.MONGODB_URI || "";
        case EnvVarTypeEnum.TwilioAccountSid:
            return process.env.TWILIO_ACCOUNT_SID || "";
        case EnvVarTypeEnum.TwilioAuthKey:
            return process.env.TWILIO_AUTH_KEY || "";
        case EnvVarTypeEnum.CallBatchSize:
            return parseInt(process.env.CALL_BATCH_SIZE || "0");
        case EnvVarTypeEnum.IntervalBetweenCustomer:
            return parseInt(process.env.INTERVAL_BETWEEN_CUSTOMER || "0");
    }

}