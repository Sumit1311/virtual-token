export default class AddCustomerDTO {
    mobileNo: string = "";
    missedCallNumber: string;
    channel:string;
    
    constructor(data: any) {
        this.mobileNo = data.From || data.from;
        this.missedCallNumber = data.Caller || data.caller;
        this.channel = data._channel;
    }
}