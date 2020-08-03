export default class RenewTokenDTO {
    token: string = "";

    constructor(body: any) {
        this.token = body.jwtToken;
    }
}