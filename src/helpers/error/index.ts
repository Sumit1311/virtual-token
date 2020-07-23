import constants from "../../constants"

export function isHandledError(message: string) {
    return (message === constants.PHONE_NUMBER_ALREADY_ADDED ||
        message === constants.INVALID_ACCOUNT_ID);
}