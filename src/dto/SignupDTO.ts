export default class SignupDTO {
    orgName: string = "";
    mobileNo: string = "";
    password: string = "";

    constructor(data: any) {
        this.orgName = data.orgName;
        this.mobileNo = data.mobileNo;
        this.password = data.password;
    }
}