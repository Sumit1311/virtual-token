import IValidatedRequest from "../helpers/jwt/IValidatedRequest";

export default class UpdateAccountDTO {
    dailyTiming: {
        from: {
            hours: number,
            minutes: number
        },
        to: {
            hours: number,
            minutes: number
        }
    };
    slotDuration: {
        minutes: number
    };
    customersPerSlot: number
    accountId:string

    constructor(req: IValidatedRequest, body: any) {
        this.accountId = req.user.accountId;
        this.dailyTiming = body.dailyTiming;
        this.slotDuration = body.slotDuration;
        this.customersPerSlot= body.customersPerSlot;
    }
}