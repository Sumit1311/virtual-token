import mongoose, { Schema, Document } from 'mongoose';
import { UserRoleTypeEnum } from '../../enums/UserRoleTypeEnum';
import { string } from 'joi';

export interface IUserRole extends Document {
    role: UserRoleTypeEnum
}

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    mobileNo: string;
    accountId: string;
    userId: string;
    roles: Array<IUserRole>;
}

export interface IUserRole extends Document {
    role: UserRoleTypeEnum
}

const UserRoleSchema: Schema = new Schema({
    role: Number
}, {
    timestamps: true
})

const UserSchema: Schema = new Schema({
    userName: String,
    email: String,
    password: String,
    mobileNo: String,
    accountId: String,
    userId: String,
    roles: [UserRoleSchema]
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);