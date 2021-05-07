import { Request, Response } from "express";
import WebhooksService from "../services/webhooks.service";
import EnqueueCustomerDTO from "../dto/EnqueueCustomerDTO";
import { handleError } from "../helpers/error";
import HttpStatus from "http-status-codes";

export default class WebhooksController {
    static webhooksService: WebhooksService = new WebhooksService();

    static async enqueue(req: Request, res: Response) {
        try {
            let body: EnqueueCustomerDTO = new EnqueueCustomerDTO({ ...req.query, _channel: req.params.channel });
            console.log(req.query);
            let content: any = await WebhooksController.webhooksService.enqueue(body);
            return res.contentType(content.contentType).end(content.response);
        } catch (error) {
            let response = handleError(error.message);
            res.status(HttpStatus.OK).send(response.getResponse().body.error).end();
        };
    }

    static async gatherCustomerResponse(req: Request, res: Response) {

    }
}