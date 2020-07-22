import mongoose, { Schema, Document } from 'mongoose';
import { ChannelTypeEnum } from '../../enums/ChannelTypeEnum';

export interface ICustomer extends Document {
    _id: string;
    customerId: string;
    token: number;
    mobileNo: string;
    called: number;
    active: boolean;
    channel: ChannelTypeEnum;
}

export interface IAccount extends Document {
    _id: string;
    sid: string;
    phoneNumber: string;
    authToken: string;
    parentSid: string;
    parentAuthToken: string;
    lastToken: number;
    password: string;
    mobileNo: string;
    customers: Array<ICustomer>;
    accountId: string;
}

const CustomerSchema: Schema = new Schema({
    customerId: String,
    token: Number,
    mobileNo: String,
    called: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    channel: Number
});

const AccountSchema: Schema = new Schema({
    sid: String,
    phoneNumber: String,
    authToken: String,
    parentSid: String,
    parentAuthToken: String,
    lastToken: Number,
    password: String,
    mobileNo: String,
    accountId: String,
    customers: [CustomerSchema]
});

export default mongoose.model<IAccount>('Account', AccountSchema);