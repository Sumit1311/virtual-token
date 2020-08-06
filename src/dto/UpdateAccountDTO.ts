import IValidatedRequest from "../helpers/jwt/IValidatedRequest";
import { MomentObjectOutput } from "moment";

export default class UpdateAccountDTO {
    dailyTiming: {
        from: MomentObjectOutput,
        to: MomentObjectOutput
    };
    slotDuration: MomentObjectOutput;
    customersPerSlot: number
    accountId: string

    constructor(req: IValidatedRequest, body: any) {
        this.accountId = req.user.accountId;
        this.dailyTiming = body.dailyTiming;
        this.slotDuration = body.slotDuration;
        this.customersPerSlot = body.customersPerSlot;
    }
}