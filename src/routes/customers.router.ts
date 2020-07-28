import express from "express"
import CustomersController from "../controllers/customers.controller";
import { validateQuery } from "../middlewares/joi";
import * as AccountSchema from "../validators/schemas/accounts"

let router = express.Router();

router.get("/call", validateQuery(AccountSchema.callCustomers), CustomersController.call);
router.get("/", validateQuery(AccountSchema.getCustomers), CustomersController.getCustomers);

export default router;