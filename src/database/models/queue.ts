import mongoose, { Schema, Document } from "mongoose";
import { ChannelTypeEnum } from "../../enums/ChannelTypeEnum";
import { FromTo } from "moment";

export interface IQueue extends Document {
    _id: string;
    queueId: string;
    token: number;
    mobileNo: string;
    called: number;
    active: boolean;
    channel: ChannelTypeEnum;
    accountId: string;
    allotedSlot: FromTo;
};

const QueueSchema: Schema = new Schema({
    customerId: String,
    token: Number,
    mobileNo: String,
    accountId: String,
    queueId: String,
    called: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    channel: Number,
    allotedSlot: Object
}, {
    timestamps: true
});

export default mongoose.model<IQueue>('Queue', QueueSchema);