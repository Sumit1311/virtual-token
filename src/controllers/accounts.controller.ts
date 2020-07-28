import AccountService from "../services/account.service";
import { Request, Response } from "express";
import AddAccountDTO from "../dto/AddAccountDTO";
import ResponseBuilder from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";
import { isHandledError } from "../helpers/error";

export default class AccountController {
    static accountService: AccountService = new AccountService();

    static async add(req: Request, res: Response) {
        const response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new AddAccountDTO(req.body);
            response.setBody(await AccountController.accountService.add(body));
            response.setStatus(HttpStatus.CREATED);
        } catch (error) {
            response.setBody({ error: error.message });
            if (!isHandledError(error.message)) {
                response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.log(error);
        }
        res.status(response.getResponse().status).send(response.getResponse()).end();
    }
}