import mongoose, { Schema, Document } from 'mongoose';
import { ChannelTypeEnum } from '../../enums/ChannelTypeEnum';
import { NotificationTypeEnum } from '../../enums/NotificationTypeEnum';
import { number } from 'joi';

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
    notificationTypes: number;
    name: string;
    missedCallNumber: string;
    callBatchSize: number;
    perCustomerTime: number;
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
}, {
    timestamps: true
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
    notificationTypes: {
        default: 0,
        type: Number
    },
    customers: [CustomerSchema],
    name: String,
    missedCallNumber: String,
    callBatchSize: {
        default: 2,
        type: Number
    },
    perCustomerTime: {
        default: 300,
        type: Number
    }
}, {
    timestamps: true
});

export default mongoose.model<IAccount>('Account', AccountSchema);