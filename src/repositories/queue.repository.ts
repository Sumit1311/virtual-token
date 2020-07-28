import QueueModel, { IQueue } from "../database/models/queue";

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
            sort: { token: 1 }
        });
    }

    async getFrontCustomer(queue: IQueue) {
        let record = await QueueModel.findOne({
            accountId: queue.accountId,
            active: true
        }, null).sort({
            token: 1
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
            active: queue.active
        }, projection, options)
    }

    private async checkIfQueueRecordExists(queue: IQueue) {
        return await QueueModel.findOne({
            accountId: queue.accountId,
            mobileNo: queue.mobileNo,
            active: true
        });
    }
}