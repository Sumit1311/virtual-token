import express from "express"
import CustomersController from "../controllers/customers.controller";
import tokenValidator from "../middlewares/jwt/tokenValidator";
import { validateParamAndBody } from "../middlewares/joi";
import * as CustomerSchema from "../validators/schemas/customers"

let router = express.Router();

router.get("/call", tokenValidator, CustomersController.call);
router.get("/", tokenValidator, CustomersController.getCustomers);
router.put("/:queueId", tokenValidator, validateParamAndBody(CustomerSchema.update), CustomersController.updateQueueRecord);

export default router;