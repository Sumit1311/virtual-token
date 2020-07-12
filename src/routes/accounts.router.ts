import express, { Router } from "express"
import AccountsController from "../controllers/accounts.controller";

export default class AccountsRouter {
    private _accountsController: AccountsController = new AccountsController();
    private _accountsRouter = express.Router();
    constructor() {
        this._accountsRouter.get("/signup", this._accountsController.signup.bind(this._accountsController));
    }
    getExpressRouter() {
        return this._accountsRouter;
    }
}

