export default class LoginDTO {
    userName: string = "";
    password: string = "";

    constructor(data: any) {
        this.userName = data.userName;
        this.password = data.password;
    }
}