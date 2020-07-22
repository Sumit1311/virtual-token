import AccountModel, { IAccount, ICustomer } from "../models/account";
import AddCustomerDTO from "../../dto/AddCustomerDTO";
import AddAccountDTO from "../../dto/AddAccountDTO";
import CallCustomerDTO from "../../dto/CallCustomerDTO";
import { getGuid, getChannelType } from "../../helpers";
import constants from "../../constants";
import { ChannelTypeEnum } from "../../enums/ChannelTypeEnum";

export default function toAccountSchema(data: AddAccountDTO | AddCustomerDTO | CallCustomerDTO) {
    if (data instanceof AddAccountDTO) {
        return addAccountDTOToAccountSchema(<AddAccountDTO>data);
    } else if (data instanceof AddCustomerDTO) {
        return addCustomerDTOToAccountSchema(<AddCustomerDTO>data);
    } else if (data instanceof CallCustomerDTO) {
        return callCustomerDTOToAccountSchema(<CallCustomerDTO>data);
    }
    else {
        throw new Error();
    }
}

function addAccountDTOToAccountSchema(data: AddAccountDTO) {
    let account: IAccount = new AccountModel();
    account.phoneNumber = data.phoneNumber;
    account.sid = data.sid;
    account.authToken = data.authToken;
    account.parentSid = data.sid;
    account.parentAuthToken = data.authToken;
    account.mobileNo = data.mobileNo;
    account.lastToken = 0;
    account.accountId = getGuid();
    return account;
}

function addCustomerDTOToAccountSchema(data: AddCustomerDTO) {
    let account: IAccount = new AccountModel();
    account.phoneNumber = data.caller;
    account.customers.push(<ICustomer>{
        mobileNo: data.mobileNo,
        channel: getChannelType(data.channel)
    })
    return account;
}

function callCustomerDTOToAccountSchema(data: CallCustomerDTO) {
    let account: IAccount = new AccountModel();
    account.accountId = data.accountId;
    return account;
}