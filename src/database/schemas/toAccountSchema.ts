import AccountModel, { IAccount } from "../models/account";
import EnqueueCustomerDTO from "../../dto/EnqueueCustomerDTO";
import AddAccountDTO from "../../dto/AddAccountDTO";
import CallCustomerDTO from "../../dto/CallCustomerDTO";
import { getGuid } from "../../helpers";
import GetCustomersDTO from "../../dto/GetCustomersDTO";
import SignupDTO from "../../dto/SignupDTO";
import { getEnvValue } from "../../helpers/env";
import { EnvVarTypeEnum } from "../../enums/EnvVarTypeEnum";
import UpdateAccountDTO from "../../dto/UpdateAccountDTO";
import { func } from "joi";
import GetAccountDTO from "../../dto/GetAccountDTO";
import moment, { MomentInputObject, MomentObjectOutput } from "moment";
import DateTimeHelper from "../../helpers/datetime";
import mongoose, { Mongoose } from "mongoose";

export default function toAccountSchema(data: AddAccountDTO | EnqueueCustomerDTO | CallCustomerDTO | GetCustomersDTO | SignupDTO | UpdateAccountDTO | GetAccountDTO) {
    if (data instanceof AddAccountDTO) {
        return addAccountDTOToAccountSchema(<AddAccountDTO>data);
    } else if (data instanceof EnqueueCustomerDTO) {
        return addCustomerDTOToAccountSchema(<EnqueueCustomerDTO>data);
    } else if (data instanceof CallCustomerDTO) {
        return callCustomerDTOToAccountSchema(<CallCustomerDTO>data);
    } else if (data instanceof GetCustomersDTO) {
        return getCustomersDTOToAccountSchema(<GetCustomersDTO>data);
    } else if (data instanceof SignupDTO) {
        return signupDTOToAccountSchema(data);
    } else if (data instanceof UpdateAccountDTO) {
        return updateAccountDTOToAccountSchema(data);
    } else if (data instanceof GetAccountDTO) {
        return getAccountDTOToAccountSchema(data);
    }
    else {
        throw new Error();
    }
}

function addAccountDTOToAccountSchema(data: AddAccountDTO) {
    let account: IAccount = new AccountModel();
    account.callingNumber = data.phoneNumber;
    account.sid = data.sid;
    account.authToken = data.authToken;
    account.parentSid = data.sid;
    account.parentAuthToken = data.authToken;
    account.mobileNo = data.mobileNo;
    account.lastToken = 0;
    account.accountId = getGuid();
    account.notificationTypes = data.notificationTypes;
    account.name = data.name;
    account.missedCallNumber = data.missedCallNumber;

    return account;


}

function addCustomerDTOToAccountSchema(data: EnqueueCustomerDTO) {
    let account: IAccount = new AccountModel();
    account.missedCallNumber = data.missedCallNumber;
    return account;
}

function callCustomerDTOToAccountSchema(data: CallCustomerDTO) {
    let account: IAccount = new AccountModel();
    account.accountId = data.accountId;
    return account;
}

function getCustomersDTOToAccountSchema(data: GetCustomersDTO) {
    let account: IAccount = new AccountModel();
    account.accountId = data.accountId;
    return account;
}

function signupDTOToAccountSchema(data: SignupDTO) {
    let account: IAccount = new AccountModel({
        slotCount: []
    });
    account.name = data.orgName;
    account.accountId = getGuid();
    account.sid = <string>getEnvValue(EnvVarTypeEnum.TwilioAccountSid);
    account.authToken = <string>getEnvValue(EnvVarTypeEnum.TwilioAuthKey);
    account.parentSid = <string>getEnvValue(EnvVarTypeEnum.TwilioAccountSid)
    account.parentAuthToken = <string>getEnvValue(EnvVarTypeEnum.TwilioAuthKey);
    account.callingNumber = <string>getEnvValue(EnvVarTypeEnum.TwilioPhoneNumber);
    account.currentDate = DateTimeHelper.getStartOfDayMillis();
    account.lastToken = 0;
    account.customersPerSlot = 20;
    account.slotDuration = {
        minutes: 60
    } as MomentObjectOutput;
    account.dailyTiming = {
        from: {
            hours: 9,
            minutes: 0
        },
        to: {
            hours: 21,
            minutes: 0
        }
    };
    return account;
}

function updateAccountDTOToAccountSchema(data: UpdateAccountDTO) {
    let account: IAccount = new AccountModel();
    account.accountId = data.accountId;
    account.dailyTiming = data.dailyTiming;
    account.slotDuration = <MomentObjectOutput>data.slotDuration;
    account.customersPerSlot = data.customersPerSlot;
    return account;
}

function getAccountDTOToAccountSchema(data: GetAccountDTO) {
    let account: IAccount = new AccountModel();
    account.accountId = data.accountId;
    return account;
}