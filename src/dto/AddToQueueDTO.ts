export default class AddToQueueDTO {
    mobileNo: string = "";
    accountId: string;

    constructor(data: any) {
        this.mobileNo = data.From || data.from;
        this.accountId = data.accountId;
    }
}