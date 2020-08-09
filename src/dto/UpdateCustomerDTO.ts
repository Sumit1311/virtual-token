import IValidatedRequest from "../helpers/jwt/IValidatedRequest";

export default class UpdateCustomerDTO {
    accountId: string = "";
    queueId: string = "";
    active: boolean = true;

    constructor(req: IValidatedRequest, body: any) {
        this.accountId = req.user.accountId;
        this.queueId = body.queueId;
        this.active = body.active;
    }
}