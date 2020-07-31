import IValidatedRequest from "../helpers/jwt/IValidatedRequest";

export default class GetAccountDTO {
    accountId: string = "";

    constructor(req: IValidatedRequest) {
        this.accountId = req.user.accountId;
    }
}