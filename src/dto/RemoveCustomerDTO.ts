import IValidatedRequest from "../helpers/jwt/IValidatedRequest";

export default class RemoveCustomerDTO {
    accountId: string = "";
    queueId: string = "";

    constructor(req: IValidatedRequest, body: any) {
        this.accountId = req.user.accountId;
        this.queueId = body.queueId;
    }
}