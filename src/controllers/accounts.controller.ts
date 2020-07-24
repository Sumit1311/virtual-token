import AccountService from "../services/account.service";
import { Request, Response } from "express";
import AddAccountDTO from "../dto/AddAccountDTO";
import ResponseBuilder from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";
import CallCustomerDTO from "../dto/CallCustomerDTO";
import { isHandledError } from "../helpers/error";
import GetCustomersDTO from "../dto/GetCustomersDTO";

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

    static async call(req: Request, res: Response) {
        const response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new CallCustomerDTO(req.query);
            response.setBody(await AccountController.accountService.call(body));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response.setBody({ error: error.message });
            if (!isHandledError(error.message)) {
                response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.log(error);
        }
        res.status(response.getResponse().status).send(response.getResponse()).end();
    }

    static async getCustomers(req:Request, res:Response) {
        const response = ResponseBuilder.getDefaultResponse();
        try {
            response.setBody(await AccountController.accountService.getCustomers(new GetCustomersDTO(req.query)));
            response.setStatus(HttpStatus.OK);
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