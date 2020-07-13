import { Twilio } from "twilio";

export default class TwilioClient extends Twilio {

    constructor(sid: string, authToken: string) {
        super(sid, authToken);
    }
}