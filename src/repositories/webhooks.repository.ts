import TwilioResponseBuilder from "../helpers/twilio/ResponseBuilder";

export default class WebhooksRepository {
    getEnqueueResponse() {
        return TwilioResponseBuilder.getRejectionResponse();
    }
}