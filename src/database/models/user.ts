import mongoose, { Schema, Document } from 'mongoose';
import { UserRoleTypeEnum } from '../../enums/UserRoleTypeEnum';

export interface IUserRole extends Document {
    role:UserRoleTypeEnum
}

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    mobileNo: string;
    accountId: string;
    roles:Array<IUserRole>;
}

const UserSchema: Schema = new Schema({
    userName: String,
    email: String,
    password: String,
    mobileNo: String,
    accountId: String,
    roles:[]
});

export default mongoose.model<IUser>('User', UserSchema);