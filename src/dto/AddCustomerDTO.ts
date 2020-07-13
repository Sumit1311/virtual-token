export default class AddCustomerDTO {
    sid: string = "";
    mobileNo: string = "";
    caller: string;
    constructor(data: any) {
        this.sid = data.AccountSid;
        this.mobileNo = data.From;
        this.caller = data.Caller;
    }
}