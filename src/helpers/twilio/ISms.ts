import { ISMS } from "../sms/SMSSender";

export default interface ITwilioSms extends ISMS {
    sid: string;
    authToken: string;
    from: string;
    to: string;
    body: string;
}