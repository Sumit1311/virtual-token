import AccountService from "../services/account.service";
import { Request, Response } from "express";
import AddAccountDTO from "../dto/AddAccountDTO";
import ResponseBuilder from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";
import CallCustomerDTO from "../dto/CallCustomerDTO";

export default class AccountController {
    static accountService: AccountService = new AccountService();

    static async add(req: Request, res: Response) {
        const response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new AddAccountDTO(req.body);
            response.body = await AccountController.accountService.add(body);
            response.status = HttpStatus.CREATED;
            response.message = HttpStatus.getStatusText(HttpStatus.CREATED);
        } catch (error) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR;
            response.message = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
            response.body = error;
            console.log(error);
        }
        res.status(response.status).send(response).end();
    }
    
    static async call(req: Request, res: Response) {
        const response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new CallCustomerDTO(req.query);
            response.body = await AccountController.accountService.call(body);
            response.status = HttpStatus.OK;
            response.message = HttpStatus.getStatusText(HttpStatus.OK);
        } catch (error) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR;
            response.message = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
            response.body = error;
            console.log(error);
        }
        res.status(response.status).send(response).end();
    }
}