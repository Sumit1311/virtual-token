import { Request, Response } from "express";
import WebhooksService from "../services/webhooks.service";
import AddCustomerDTO from "../dto/AddCustomerDTO";

export default class WebhooksController {
    static webhooksService: WebhooksService = new WebhooksService();

    static async enqueue(req: Request, res: Response) {
        try {
            let body: AddCustomerDTO = new AddCustomerDTO({ ...req.query, _channel: req.params.channel });
            let content: any = await WebhooksController.webhooksService.enqueue(body);
            return res.contentType(content.contentType).end(content.response);
        } catch (error) {
            console.log(error);
            res.status(500).end(error.message);
        };
    }

    static async gatherCustomerResponse(req: Request, res: Response) {

    }
}