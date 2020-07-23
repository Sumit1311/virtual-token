import express, { Router } from "express"
import WebhooksController from "../controllers/webhooks.controller";

let router = express.Router();

router.get("/:channel/enqueue", WebhooksController.enqueue);
router.get("/get-customer-response", WebhooksController.gatherCustomerResponse)

export default router;