import TwilioResponseBuilder from "../helpers/twilio/ResponseBuilder";
import ITwilioResponse from "../helpers/twilio/IResponse";
import AddCustomerDTO from "../dto/AddCustomerDTO";
import constants from "../constants";
import MimeTypes from "mime-types";

export default class WebhooksRepository {
    getEnqueueResponse(data: AddCustomerDTO) {
        if (data.channel === constants.TWILIO) {
            let response: ITwilioResponse = TwilioResponseBuilder.getRejectionResponse();
            return {
                contentType: response.contentType,
                response: response.content
            }
        } else if (data.channel === constants.ONERING) {
            return {
                contentType: MimeTypes.lookup("text"),
                response: "You are in the waiting queue. Your token number is 1. You will be notified before 15 mins of your turn."
            }
        } else {
            return {
                contentType: MimeTypes.lookup("json"),
                response: {}
            }
        }

    }
}