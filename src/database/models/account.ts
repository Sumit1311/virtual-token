import mongoose, { Schema, Document } from 'mongoose';
import { number } from 'joi';

export interface ICustomer extends Document {
    _id: string;
    customerId: string;
    token: number;
    mobileNo: string;
    called: number;
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
}

const CustomerSchema: Schema = new Schema({
    customerId: String,
    token: Number,
    mobileNo: String,
    called: {
        type: Number,
        default: 0
    }
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
    customers: [CustomerSchema]
});

export default mongoose.model<IAccount>('Account', AccountSchema);