import UserModel, { IUser } from "../database/models/user";
import constants from "../constants";

export default class UserRepository {
    async add(user: IUser) {
        let userRecord = await this.checkIfUserAlreadyExists(user);
        if (userRecord === null) {
            return await user.save();
        } else {
            throw new Error(constants.USER_ALREADY_EXISTS);
        }
    }

    async findUserByMobileNo(user: IUser) {
        let userRecord = await this.checkIfUserAlreadyExists(user);
        if (userRecord === null) {
            throw new Error(constants.USER_NOT_FOUND);
        } else {
            return userRecord;
        }
    }

    async findUserByUserName(user: IUser) {
        let userRecord = await this.checkIfUserAlreadyExistsByUserName(user);
        if (userRecord === null) {
            throw new Error(constants.USER_NOT_FOUND);
        } else {
            return userRecord;
        }
    }

    async findUserByUserId(user: IUser) {
        let userRecord = await this.checkIfUserAlreadyExistsByUserId(user);
        if (userRecord === null) {
            throw new Error(constants.USER_NOT_FOUND);
        } else {
            return userRecord;
        }
    }

    private async checkIfUserAlreadyExists(user: IUser) {
        return await UserModel.findOne({
            accountId: user.accountId,
            mobileNo: user.mobileNo
        })
    }

    private async checkIfUserAlreadyExistsByUserId(user: IUser) {
        return await UserModel.findOne({
            accountId: user.accountId,
            userId: user.userId
        })
    }

    private async checkIfUserAlreadyExistsByUserName(user: IUser) {
        return await UserModel.findOne({
            userName: user.userName
        })
    }
}