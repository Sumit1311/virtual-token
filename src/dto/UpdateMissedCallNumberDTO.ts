import IValidatedRequest from "../helpers/jwt/IValidatedRequest";

export default class UpdateMissedCallNumberDTO {
    accountId: string = "";
    missedCallNumber: string = "";

    constructor(req: IValidatedRequest, body: any) {
        this.accountId = req.user.accountId;
        this.missedCallNumber = body.missedCallNumber;
    }
}