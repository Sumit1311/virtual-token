export interface ISMS {
    to: string;
    from: string;
    body: string;
    context: any;
}

export default interface BaseSMSSender {
    send(data: ISMS): any;
}