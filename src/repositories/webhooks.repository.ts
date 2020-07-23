import TwilioResponseBuilder from "../helpers/twilio/ResponseBuilder";
import ITwilioResponse from "../helpers/twilio/IResponse";
import AddCustomerDTO from "../dto/AddCustomerDTO";
import constants from "../constants";
import MimeTypes from "mime-types";

export default class WebhooksRepository {
    getEnqueueResponse({ channel, assignedToken, currentToken, estimatedDuration }: any) {
        if (channel === constants.TWILIO) {
            let response: ITwilioResponse = TwilioResponseBuilder.getRejectionResponse();
            return {
                contentType: response.contentType,
                response: response.content
            }
        } else if (channel === constants.ONERING) {
            return {
                contentType: MimeTypes.lookup("text"),
                response: `You are in the waiting queue. Token number is ${assignedToken}. Current token being served is ${currentToken}. Estimated duration : ${estimatedDuration} mins`
            }
        } else {
            return {
                contentType: MimeTypes.lookup("json"),
                response: {}
            }
        }

    }
}