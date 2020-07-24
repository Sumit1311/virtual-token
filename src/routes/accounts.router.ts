import express from "express"
import AccountsController from "../controllers/accounts.controller";
import { validateBody, validateQuery } from "../middlewares/joi";
import * as AccountSchema from "../validators/schemas/accounts"

let router = express.Router();

router.post("/add", validateBody(AccountSchema.create), AccountsController.add);
router.get("/call-customers", validateQuery(AccountSchema.callCustomers), AccountsController.call);
router.get("/customers", validateQuery(AccountSchema.getCustomers), AccountsController.getCustomers);

export default router;