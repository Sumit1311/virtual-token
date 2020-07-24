import AccountModel, { IAccount, ICustomer } from "../models/account";
import AddCustomerDTO from "../../dto/AddCustomerDTO";
import AddAccountDTO from "../../dto/AddAccountDTO";
import CallCustomerDTO from "../../dto/CallCustomerDTO";
import { getGuid, getChannelType } from "../../helpers";
import constants from "../../constants";
import { ChannelTypeEnum } from "../../enums/ChannelTypeEnum";
import GetCustomersDTO from "../../dto/GetCustomersDTO";

export default function toAccountSchema(data: AddAccountDTO | AddCustomerDTO | CallCustomerDTO | GetCustomersDTO) {
    if (data instanceof AddAccountDTO) {
        return addAccountDTOToAccountSchema(<AddAccountDTO>data);
    } else if (data instanceof AddCustomerDTO) {
        return addCustomerDTOToAccountSchema(<AddCustomerDTO>data);
    } else if (data instanceof CallCustomerDTO) {
        return callCustomerDTOToAccountSchema(<CallCustomerDTO>data);
    } else if (data instanceof GetCustomersDTO) {
        return getCustomersDTOToAccountSchema(<GetCustomersDTO>data);
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
    account.notificationTypes = data.notificationTypes;
    account.name = data.name;
    account.missedCallNumber = data.missedCallNumber;
    return account;
}

function addCustomerDTOToAccountSchema(data: AddCustomerDTO) {
    let account: IAccount = new AccountModel();
    account.missedCallNumber = data.missedCallNumber;
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

function getCustomersDTOToAccountSchema(data: GetCustomersDTO) {
    let account: IAccount = new AccountModel();
    account.accountId = data.accountId;
    return account;
}