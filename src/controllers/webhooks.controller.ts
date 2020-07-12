import { Request, Response } from "express";
import WebhooksService from "../services/webhooks.service";
import ITwilioResponse from "../helpers/twilio/IResponse";

export default class WebhooksController {
    private _webhooksService: WebhooksService = new WebhooksService();
    constructor(){
        
    }
    enqueue(req: Request, res: Response) {
        let response: ITwilioResponse = this._webhooksService.enqueue();
        return res.contentType(response.contentType).end(response.content);
    }
}