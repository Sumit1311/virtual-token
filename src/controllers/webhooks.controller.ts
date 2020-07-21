import { Request, Response } from "express";
import WebhooksService from "../services/webhooks.service";
import ITwilioResponse from "../helpers/twilio/IResponse";
import AddCustomerDTO from "../dto/AddCustomerDTO";
import constants from "../constants";

export default class WebhooksController {
    static webhooksService: WebhooksService = new WebhooksService();

    static async enqueue(req: Request, res: Response) {
        if (req.params.channel === constants.TWILIO) {
            let body: AddCustomerDTO = new AddCustomerDTO(req.query);
            let response: ITwilioResponse = await WebhooksController.webhooksService.enqueue(body);
            return res.contentType(response.contentType).end(response.content);
        } else if (req.params.channel === constants.ONERING) {
            console.log(req.query);
        } else {
            res.end();
        }
    }

    static async gatherCustomerResponse(req: Request, res: Response) {

    }
}