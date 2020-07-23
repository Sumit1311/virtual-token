import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";

export default class AddAccountDTO {
    phoneNumber: string = "";
    sid: string = "";
    authToken: string = "";
    mobileNo: string = "";
    notificationTypes: number = 0;
    name: string = "";
    missedCallNumber: string = "";

    constructor(data: any) {
        this.phoneNumber = data.phoneNumber;
        this.sid = data.sid;
        this.authToken = data.authToken;
        this.mobileNo = data.mobileNo;
        this.notificationTypes = data.notificationTypes;
        this.name = data.name;
        this.missedCallNumber = data.missedCallNumber;
    }
}