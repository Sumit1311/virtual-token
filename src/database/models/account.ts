import mongoose, { Schema, Document } from 'mongoose';
import { MomentObjectOutput, FromTo } from 'moment';

export interface ICurrentSlot {
    date: number;
    startToken: number;
}

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
    currentSlot: ICurrentSlot;
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
        type: Object,
        default: {
            from: {
                hours: 9,
                minutes: 0
            },
            to: {
                hours: 21,
                minutes: 0
            }
        }
    },
    slotDuration: {
        type: Object,
        default: {
            minutes: 60
        }
    },
    customersPerSlot: {
        type: Number,
        default: 20
    },
    currentSlot: Object
}, {
    timestamps: true
});

export default mongoose.model<IAccount>('Account', AccountSchema);