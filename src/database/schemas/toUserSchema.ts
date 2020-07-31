import SignupDTO from "../../dto/SignupDTO";
import LoginDTO from "../../dto/LoginDTO";
import UserModel, { IUser } from "../models/user";
import { getPasswordHash } from "../../helpers/bcrypt";
import constants from "../../constants";
import { getGuid } from "../../helpers";
import { JWTPayload } from "../../helpers/jwt/IPayload";

export default async function toUserSchema(data: SignupDTO | LoginDTO | JWTPayload) {
    if (data instanceof SignupDTO) {
        return sigupDTOToUserSchema(data);
    } else if (data instanceof LoginDTO) {
        return loginDTOToUserSchema(data);
    } else if (data instanceof JWTPayload) {
        return jwtTokenPayloadToUserSchema(data);
    }
    else {
        throw new Error(constants.INVALID_DTO);
    }
}

async function sigupDTOToUserSchema(data: SignupDTO) {
    let user: IUser = new UserModel();
    user.userId = getGuid();
    user.userName = data.mobileNo;
    user.mobileNo = data.mobileNo;
    user.password = await getPasswordHash(data.password);
    return user;
}

async function loginDTOToUserSchema(data: LoginDTO) {
    let user: IUser = new UserModel();
    user.userName = data.userName;
    user.password = data.password;
    return user;
}

async function jwtTokenPayloadToUserSchema(data: JWTPayload) {
    let user: IUser = new UserModel();
    user.userId = data.userId;
    user.accountId = data.accountId;
    return user;
}