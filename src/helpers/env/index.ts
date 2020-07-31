import { EnvVarTypeEnum } from "../../enums/EnvVarTypeEnum";
import constants from "../../constants";

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
        case EnvVarTypeEnum.JwtSecretKey:
            return process.env.JWT_SECRET_KEY || "";
        case EnvVarTypeEnum.TwilioPhoneNumber:
            return process.env.TWILIO_PHONE_NUMBER || ""
        default:
            throw new Error(constants.ENV_VAR_NOT_FOUND);
    }

}