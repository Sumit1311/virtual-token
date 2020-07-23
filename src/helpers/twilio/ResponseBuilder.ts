import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import MimeTypes from "mime-types";
import ITwilioResponse from "./IResponse";
import { twiml } from "twilio";

export default class TwilioResponseBuilder {

    static getRejectionResponse() {
        let twimlResponse: VoiceResponse = new VoiceResponse();
        twimlResponse.reject({ reason: "busy" });
        return <ITwilioResponse>{ content: twimlResponse.toString(), contentType: MimeTypes.lookup("xml") };
    }

    static getCustomerCallResponse() {
        let twimlResponse: VoiceResponse = new VoiceResponse();
        twimlResponse.say("Thank you for waiting in queue.");
        twimlResponse.pause({
            length: 1
        });
        twimlResponse.say("Your turn has come. ");
        twimlResponse.pause({
            length: 1
        });
        twimlResponse.say("Please visit the shop now");
        twimlResponse.pause({
            length: 1
        });
        /*twimlResponse.say("Are you visiting the shop now?");
        twimlResponse.gather({
            action: '/get-customer-response',
            input: ['speech']
        }).say("Say yes or no");*/
        return <ITwilioResponse>{ content: twimlResponse.toString(), contentType: MimeTypes.lookup("xml") };
    }

    static getCustomerSMSResponse() {
        return { content: "Thank you for waiting in queue. Your turn has come. Please visit the shop now" };
    }
}