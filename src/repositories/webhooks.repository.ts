import TwilioResponseBuilder from "../helpers/twilio/ResponseBuilder";
import ITwilioResponse from "../helpers/twilio/IResponse";
import moment from "moment";
import constants from "../constants";
import MimeTypes from "mime-types";

export default class WebhooksRepository {
    getEnqueueResponse({ channel, assignedToken, allotedSlot }: any) {
        if (channel === constants.TWILIO) {
            let response: ITwilioResponse = TwilioResponseBuilder.getRejectionResponse();
            return {
                contentType: response.contentType,
                response: response.content
            }
        } else if (channel === constants.ONERING) {
            let from = moment(allotedSlot.from).format("hh:mm a");
            let to = moment(allotedSlot.to).format("hh:mm a");
            return {
                contentType: MimeTypes.lookup("text"),
                response: `Your token number is ${assignedToken}. Slot alloted to visit hospital ${from} to ${to}.`
            }
        } else {
            return {
                contentType: MimeTypes.lookup("json"),
                response: {}
            }
        }

    }
}