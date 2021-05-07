import QueueService from "../services/queue.service";
import { Request, Response } from "express";
import ResponseBuilder, { APIResponse } from "../helpers/http/ResponseBuilder";
import { handleError } from "../helpers/error";
import HttpStatus from "http-status-codes";

export default class UserController {
    static queueService: QueueService = new QueueService();

    static async add(req: Request, res: Response) {
        let response;
        try {
            response = ResponseBuilder.getDefaultResponse();
            this.queueService.add();
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }
}