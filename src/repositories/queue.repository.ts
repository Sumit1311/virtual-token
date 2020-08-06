import QueueModel, { IQueue } from "../database/models/queue";
import moment from "moment";

export default class QueueRepository {
    async addToQueue(queue: IQueue) {
        let record = await this.checkIfQueueRecordExists(queue);
        if (record === null) {
            return await queue.save();
        } else {
            return record;
        }
    }

    async getQueue(queue: IQueue) {
        queue.active = true;

        return await this.find(queue, null, {
            sort: { "allotedSlot.from": 1, token: 1 }
        });
    }

    async getFrontCustomer(queue: IQueue) {
        let record = await QueueModel.findOne({
            accountId: queue.accountId,
            active: true
        }, null).sort({
            token: 1,
            "allotedSlot.from": 1
        }).exec();
        return record;
    }

    async removeFromQueue(queue: IQueue) {
        queue.active = false;
        return await queue.save();
    }

    private async find(queue: IQueue, projection: any = null, options: any = null) {
        return await QueueModel.find({
            accountId: queue.accountId,
            active: queue.active,
            "allotedSlot.from": { $gte: moment().utc().startOf("day").valueOf() }
        }, projection, options)
    }

    private async checkIfQueueRecordExists(queue: IQueue) {
        return await QueueModel.findOne({
            accountId: queue.accountId,
            mobileNo: queue.mobileNo,
            active: true,
            $and: [
                {
                    "allotedSlot.from": {
                        $gte: moment().utc().startOf("day").valueOf()
                    }
                }, {
                    "allotedSlot.to": {
                        $lte: moment().utc().endOf("day").valueOf()
                    }
                }]
        });
    }
}