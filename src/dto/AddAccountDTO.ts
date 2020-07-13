export default class AddAccountDTO {
    phoneNumber: string = "";
    sid: string = "";
    authToken: string = "";
    mobileNo: string = "";
    constructor(data: any) {
        this.phoneNumber = data.phoneNumber;
        this.sid = data.sid;
        this.authToken = data.authToken;
        this.mobileNo = data.mobileNo;
    }
}