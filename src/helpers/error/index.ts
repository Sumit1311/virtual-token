import constants from "../../constants"
import ResponseBuilder, { APIResponse } from "../http/ResponseBuilder";
import HttpStatus from "http-status-codes";

export function isHandledError(message: string) {
    let response: null | APIResponse = ResponseBuilder.getDefaultResponse();
    response.setBody({ error: message });
    switch (message) {
        case constants.INVALID_PASSWORD:
        case constants.ORGANISATION_NAME_EXISTS:
        case constants.USER_NOT_FOUND:
        case constants.USER_ALREADY_EXISTS:
        case constants.PHONE_NUMBER_ALREADY_ADDED:
        case constants.INVALID_ACCOUNT_ID:
            response.setStatus(HttpStatus.BAD_REQUEST);
            break;
        case constants.TOKEN_MISSING:
            response.setStatus(HttpStatus.UNAUTHORIZED);
        default:
            response = null;
    }
    return response;
}