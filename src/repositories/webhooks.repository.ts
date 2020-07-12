import TwilioResponseBuilder from "../helpers/twilio";

export default class WebhooksRepository {
    getEnqueueResponse() {
        return TwilioResponseBuilder.getRejectionResponse();
    }
}