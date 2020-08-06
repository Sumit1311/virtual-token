import moment, { MomentInput, isMoment } from "moment";
import { getExpectedBodyHash } from "twilio/lib/webhooks/webhooks";
import { SyncMapPermissionPage } from "twilio/lib/rest/sync/v1/service/syncMap/syncMapPermission";

function getMoment(input: MomentInput | null) {
    let momentObject;
    if (input === null) {
        momentObject = moment().utc();
    } else if (input) {
        momentObject = moment(input).utc();
    } else if (isMoment(input)) {
        console.log("isMoment");
        momentObject = input;
    } else {
        momentObject = moment().utc();
    }
    return momentObject;
}

const DateTimeHelper = {
    getStartOfDayMillis: (input: MomentInput = null) => {
        return getMoment(input).startOf("day").valueOf();
    },

    getStartOfDay: (input: MomentInput = null) => {
        return getMoment(input).startOf("day");
    },

    getOffsetMoment: (offset: string) => {
        return getMoment(null).utcOffset(offset);
    },

    getUTCDate(input: MomentInput = null) {
        let momentObject = moment();
        if (input) {
            momentObject = moment(input);
        }
        return momentObject.utc().get("day");
    }
}

export default DateTimeHelper;