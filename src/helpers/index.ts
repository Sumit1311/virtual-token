import * as uuid from "uuid";
import constants from "../constants";
import { ChannelTypeEnum } from "../enums/ChannelTypeEnum";

export function getGuid() {
    return uuid.v1();
}

export function getChannelType(channel: string) {
    return ((channel === constants.TWILIO) ? ChannelTypeEnum.Twilio : ((channel === constants.ONERING) ? ChannelTypeEnum.OneRing : ChannelTypeEnum.None))
}

export function getCallingPrefix(channel: ChannelTypeEnum) {
    return channel === ChannelTypeEnum.OneRing ? "+91" : "";
}