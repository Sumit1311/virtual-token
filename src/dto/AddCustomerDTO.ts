export default class AddCustomerDTO {
    mobileNo: string = "";
    missedCallNumber: string;
    channel:string;
    department:string;
    
    constructor(data: any) {
        this.mobileNo = data.From || data.from;
        this.missedCallNumber = data.Caller || data.caller;
        this.department = data.department;
        this.channel = data._channel;
    }
}