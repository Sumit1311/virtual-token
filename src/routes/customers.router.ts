import express from "express"
import CustomersController from "../controllers/customers.controller";
import tokenValidator from "../middlewares/jwt/tokenValidator";

let router = express.Router();

router.get("/call", tokenValidator, CustomersController.call);
router.get("/", tokenValidator, CustomersController.getCustomers);

export default router;