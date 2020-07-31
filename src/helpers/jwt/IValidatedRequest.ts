import { Request } from "express"
import { JWTPayload } from "./IPayload";
import { IUser } from "../../database/models/user";

export default interface IValidatedRequest extends Request {
    user: IUser
}