export default class CallCustomerDTO {
    accountId: string = "";

    constructor(data: any) {
        this.accountId = data.accountId;
    }
}