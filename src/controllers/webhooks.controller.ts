import { Request, Response } from "express";
import WebhooksService from "../services/webhooks.service";
import AddCustomerDTO from "../dto/AddCustomerDTO";

export default class WebhooksController {
    static webhooksService: WebhooksService = new WebhooksService();

    static async enqueue(req: Request, res: Response) {
        try {
            console.log(req.query);
            let body: AddCustomerDTO = new AddCustomerDTO({ ...req.query, _channel: req.params.channel });
            let response: any = await WebhooksController.webhooksService.enqueue(body);
            return res.contentType(response.contentType).end(response.content);
        } catch (error) {
            res.status(500).end("Internal Server Error");
        };
    }

    static async gatherCustomerResponse(req: Request, res: Response) {

    }
}