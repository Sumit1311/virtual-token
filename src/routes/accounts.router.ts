import express from "express"
import AccountsController from "../controllers/accounts.controller";
import { validateBody } from "../middlewares/joi";
import * as AccountSchema from "../validators/schemas/accounts"
import tokenValidator from "../middlewares/jwt/tokenValidator";

let router = express.Router();

router.post("/add", validateBody(AccountSchema.create), tokenValidator, AccountsController.add);
router.post("/signup", validateBody(AccountSchema.signup), AccountsController.signup);
router.put("/", validateBody(AccountSchema.update), tokenValidator, AccountsController.update);
router.get("/", tokenValidator, AccountsController.getAccount);

export default router;