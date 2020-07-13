import AccountService from "../services/account.service";
import { Request, Response } from "express";
import AddAccountDTO from "../dto/addAccountDTO";
import ResponseBuilder from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";

export default class AccountController {
    static accountService: AccountService = new AccountService();
    static async add(req: Request, res: Response) {
        const response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new AddAccountDTO(req.body);
            response.body = await AccountController.accountService.add(body);
            response.status = HttpStatus.CREATED;
        } catch (error) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR;
            response.message = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
            response.body = error;
            console.log(error);
        }
        res.status(response.status).send(response).end();
    }
}