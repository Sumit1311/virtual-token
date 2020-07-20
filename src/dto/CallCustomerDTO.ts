export default class CallCustomerDTO {
    number: number = 5;
    sid: string = "";
    constructor(data: any) {
        let n: number;
        n = parseInt(data.number);
        if (isNaN(n)) {
            throw new Error("Not a number");
        }
        this.number = n;
        this.sid = data.sid;
    }
}