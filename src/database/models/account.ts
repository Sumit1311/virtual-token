import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    _id: string;
    customerId: string;
    token: string;
    mobileNo: string;
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
    customers: Array<ICustomer>;
}

const CustomerSchema: Schema = new Schema({
    customerId: String,
    token: Number,
    mobileNo: String
});

const AccountSchema: Schema = new Schema({
    sid: String,
    phoneNumber: String,
    authToken: String,
    parentSid: String,
    parentAuthToken: String,
    lastToken: Number,
    password: String,
    customers: [CustomerSchema]
});

export default mongoose.model<IAccount>('Account', AccountSchema);