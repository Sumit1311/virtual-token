import constants from "../../constants"
import ResponseBuilder, { APIResponse } from "../http/ResponseBuilder";
import HttpStatus from "http-status-codes";

export function isHandledError(message: string) {
    let response: null | APIResponse = ResponseBuilder.getDefaultResponse();
    response.setBody({ error: message });
    switch (message) {
        case constants.PHONE_NUMBER_ALREADY_ADDED:
        case constants.INVALID_ACCOUNT_ID:
            response.setBody({ error: message });
            break;
        case constants.TOKEN_MISSING:
            response.setStatus(HttpStatus.UNAUTHORIZED);
        default:
            response = null;
    }
    return response;
}