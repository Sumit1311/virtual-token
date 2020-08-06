import mongoose, { Schema, Document, Mongoose } from 'mongoose';
import { MomentObjectOutput, FromTo } from 'moment';

export interface IAccount extends Document {
    _id: string;
    sid: string;
    callingNumber: string;
    authToken: string;
    parentSid: string;
    parentAuthToken: string;
    lastToken: number;
    password: string;
    mobileNo: string;
    accountId: string;
    notificationTypes: number;
    name: string;
    missedCallNumber: string;
    dailyTiming: FromTo;
    slotDuration: MomentObjectOutput;
    customersPerSlot: number;
    currentDate: number;
    slotCount: mongoose.Types.Array<number>;
}

const AccountSchema: Schema = new Schema({
    sid: String,
    callingNumber: String,
    authToken: String,
    parentSid: String,
    parentAuthToken: String,
    lastToken: {
        default: 0,
        type: Number
    },
    accountId: String,
    notificationTypes: {
        default: 0,
        type: Number
    },
    name: String,
    missedCallNumber: String,
    callBatchSize: {
        default: 2,
        type: Number
    },
    dailyTiming: {
        type: Object
    },
    slotDuration: {
        type: Object,
    },
    customersPerSlot: {
        type: Number
    },
    currentDate: Number,
    slotCount: [Number]
}, {
    timestamps: true
});

export default mongoose.model<IAccount>('Account', AccountSchema);