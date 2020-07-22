export default class AddCustomerDTO {
    mobileNo: string = "";
    caller: string;
    channel:string;
    constructor(data: any) {
        this.mobileNo = data.From || data.from;
        this.caller = data.Caller || data.caller;
        this.channel = data._channel;
    }
}