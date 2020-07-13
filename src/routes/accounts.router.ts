import express from "express"
import AccountsController from "../controllers/accounts.controller";
import { validateBody } from "../middlewares/joi";
import * as AccountSchema from "../validators/schemas/accounts"

let router = express.Router();

router.post("/add", validateBody(AccountSchema.create), AccountsController.add);

export default router;