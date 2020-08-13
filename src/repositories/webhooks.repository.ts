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
            let from = moment(allotedSlot.from).utc().utcOffset("+05:30").format("hh:mm a");
            let to = moment(allotedSlot.to).utc().utcOffset("+05:30").format("hh:mm a");

            return {
                contentType: MimeTypes.lookup("text"),
                response: `Your token number is ${assignedToken}. You can visit ${moment(allotedSlot.from).utc().utcOffset("+05:30").calendar()}. Slot alloted is ${from} to ${to}.`
            }
        } else if (channel === constants.MYOPERATOR) {
            let from = moment(allotedSlot.from).utc().utcOffset("+05:30").format("hh:mm a");
            let to = moment(allotedSlot.to).utc().utcOffset("+05:30").format("hh:mm a");

            return {
                contentType: MimeTypes.lookup("text"),
                response: `Your token number is ${assignedToken}. You can visit ${moment(allotedSlot.from).utc().utcOffset("+05:30").calendar()}. Slot alloted is ${from} to ${to}.`
            }
        } else if (channel === constants.MISSEDDIAL) {
            let from = moment(allotedSlot.from).utc().utcOffset("+05:30").format("hh:mm a");
            let to = moment(allotedSlot.to).utc().utcOffset("+05:30").format("hh:mm a");

            return {
                contentType: MimeTypes.lookup("text"),
                response: `Your token number is ${assignedToken}. You can visit ${moment(allotedSlot.from).utc().utcOffset("+05:30").calendar()}. Slot alloted is ${from} to ${to}.`
            }
        } else {
            return {
                contentType: MimeTypes.lookup("json"),
                response: ""
            }
        }

    }
}