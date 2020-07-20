import TwilioVoiceAPIHelper from "../../helpers/twilio/VoiceAPI";
import ITwilioCall from "../../helpers/twilio/ICall";
import TwilioResponseBuilder from "../../helpers/twilio/ResponseBuilder";

export default class TwilioVoiceRepository {
    private _twilioVoiceHelper: TwilioVoiceAPIHelper;

    constructor() {
        this._twilioVoiceHelper = new TwilioVoiceAPIHelper();
    }
    async callCustomer(callData: ITwilioCall) {
        callData.twiml = TwilioResponseBuilder.getCustomerCallResponse().content;
        await this._twilioVoiceHelper.call(callData);
    }
}