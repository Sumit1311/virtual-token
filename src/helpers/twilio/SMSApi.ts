import TwilioClient from "./client";
import ITwilioSms from "./ISms";

export default class TwilioSMSAPIHelper {
    constructor() {
    }
    async send(data: ITwilioSms) {
        const callResponse = await (new TwilioClient(data.sid, data.authToken)).messages.create({
            body: data.body,
            to: data.to,
            from: data.from
        });
    }
}