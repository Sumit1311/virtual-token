import TwilioResponseBuilder from "../../helpers/twilio/ResponseBuilder";
import TwilioSMSAPIHelper from "../../helpers/twilio/SMSApi";
import ITwilioSms from "../../helpers/twilio/ISms";

export default class TwilioSMSRepository {
    private _twilioSmsHelper: TwilioSMSAPIHelper;

    constructor() {
        this._twilioSmsHelper = new TwilioSMSAPIHelper();
    }
    async sendSmsToCustomer(data: ITwilioSms) {
        data.body = TwilioResponseBuilder.getCustomerSMSResponse().content;
        await this._twilioSmsHelper.send(data);
    }
}