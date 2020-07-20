import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import MimeTypes from "mime-types";
import ITwilioResponse from "./IResponse";

export default class TwilioResponseBuilder {

    static getRejectionResponse() {
        let twimlResponse: VoiceResponse = new VoiceResponse();
        twimlResponse.reject({ reason: "busy" });
        return <ITwilioResponse>{ content: twimlResponse.toString(), contentType: MimeTypes.lookup("xml") };
    }

    static getCustomerCallResponse() {
        let twimlResponse: VoiceResponse = new VoiceResponse();
        twimlResponse.say("Thank you for waiting in queue. Now, you can visit the shop.");
        /*twimlResponse.say("Are you visiting the shop now?");
        twimlResponse.gather({
            action: '/get-customer-response',
            input: ['speech']
        }).say("Say yes or no");*/
        return <ITwilioResponse>{ content: twimlResponse.toString(), contentType: MimeTypes.lookup("xml") };
    }
}