export default interface ITwilioCall {
    sid:string;
    authToken:string;
    from: string;
    to:string;
    twiml:string;
}