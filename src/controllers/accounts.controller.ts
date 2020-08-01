import AccountService from "../services/account.service";
import { Request, Response } from "express";
import AddAccountDTO from "../dto/AddAccountDTO";
import ResponseBuilder, { APIResponse } from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";
import { handleError } from "../helpers/error";
import SignupDTO from "../dto/SignupDTO";
import IValidatedRequest from "../helpers/jwt/IValidatedRequest";
import UpdateMissedCallNumberDTO from "../dto/UpdateMissedCallNumberDTO";
import GetAccountDTO from "../dto/GetAccountDTO";

export default class AccountController {
    static accountService: AccountService = new AccountService();

    static async add(req: Request, res: Response) {
        let response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new AddAccountDTO(req.body);
            response.setBody(await AccountController.accountService.add(body));
            response.setStatus(HttpStatus.CREATED);
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }

    static async signup(req: Request, res: Response) {
        let response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new SignupDTO(req.body);
            response.setBody(await AccountController.accountService.signup(body));
            response.setStatus(HttpStatus.CREATED);
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }

    static async updateMissedCallNumber(req: Request, res: Response) {
        let response = ResponseBuilder.getDefaultResponse();
        let validatedReq = <IValidatedRequest>req;
        try {
            const body = new UpdateMissedCallNumberDTO(validatedReq, req.body);
            response.setBody(await AccountController.accountService.updateMissedCallNumber(body));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }

    static async getAccount(req: Request, res: Response) {
        let response = ResponseBuilder.getDefaultResponse();
        let validatedReq = <IValidatedRequest>req;
        try {
            const body = new GetAccountDTO(validatedReq);
            response.setBody(await AccountController.accountService.getAccount(body));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }
}