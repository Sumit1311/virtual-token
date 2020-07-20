import { Request, Response } from "express";
import WebhooksService from "../services/webhooks.service";
import ITwilioResponse from "../helpers/twilio/IResponse";
import AddCustomerDTO from "../dto/AddCustomerDTO";

export default class WebhooksController {
    static webhooksService: WebhooksService = new WebhooksService();
    
    static async enqueue(req: Request, res: Response) {
        let body: AddCustomerDTO = new AddCustomerDTO(req.query);
        let response: ITwilioResponse = await WebhooksController.webhooksService.enqueue(body);
        return res.contentType(response.contentType).end(response.content);
    }

    static async gatherCustomerResponse(req:Request, res:Response) {
        
    }
}