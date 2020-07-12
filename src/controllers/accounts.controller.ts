import AccountService from "../services/account.service";
import { Request, Response } from "express";

export default class AccountController {
    private _accountService: AccountService = new AccountService();
    signup(req: Request, response: Response) {
        this._accountService.signup(req.body);
    }
}