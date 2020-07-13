import AccountModel, { IAccount, ICustomer } from "../models/account";
import AddCustomerDTO from "../../dto/AddCustomerDTO";
import AddAccountDTO from "../../dto/AddAccountDTO";

export default function toAccountSchema(data: AddAccountDTO | AddCustomerDTO) {
    if (data.constructor.name === "AddAccountDTO") {
        return addAccountDTOToAccountSchema(<AddAccountDTO>data);
    } else if (data.constructor.name === "AddCustomerDTO") {
        return addCustomerDTOToAccountSchema(<AddCustomerDTO>data);
    } else {
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
    return account;
}

function addCustomerDTOToAccountSchema(data: AddCustomerDTO) {
    let account: IAccount = new AccountModel();
    account.sid = data.sid;
    account.customers.push(<ICustomer>{
        mobileNo:data.mobileNo
    })
    return account;
}
