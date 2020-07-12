import express, { Router } from "express"
import WebhooksController from "../controllers/webhooks.controller";

export default class WebhooksRouter {
    private _webhooksController: WebhooksController = new WebhooksController();
    private _webhooksRouter = express.Router();
    constructor() {
        this._webhooksRouter.get("/enqueue", this._webhooksController.enqueue.bind(this._webhooksController));
    }
    getExpressRouter() {
        return this._webhooksRouter;
    }
}

