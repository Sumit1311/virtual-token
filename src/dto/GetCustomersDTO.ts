export default class GetCustomersDTO {
    accountId: string = "";

    constructor(data: any) {
        this.accountId = data.accountId;
    }
}