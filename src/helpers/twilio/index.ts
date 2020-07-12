import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import MimeTypes from "mime-types";
import ITwilioResponse from "./IResponse";

export default class TwilioResponseBuilder {

    static getRejectionResponse() {
        let twimlResponse: VoiceResponse = new VoiceResponse();
        twimlResponse.reject({ reason: "rejected" });
        return <ITwilioResponse>{ content: twimlResponse.toString(), contentType: MimeTypes.lookup("xml") };
    }
}