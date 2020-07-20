import TwilioClient from "./client";
import ITwilioCall from "./ICall";

export default class TwilioVoiceAPIHelper {
    constructor() {
    }
    async call(callData: ITwilioCall) {
        const callResponse = await (new TwilioClient(callData.sid, callData.authToken)).calls.create({
            twiml: callData.twiml,
            to: callData.to,
            from: callData.from
        });
    }
}