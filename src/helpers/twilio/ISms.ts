export default interface ITwilioSms {
    sid:string;
    authToken:string;
    from: string;
    to:string;
    body:string;
}