import express from "express"
import { validateBody } from "../middlewares/joi";
import * as UserSchema from "../validators/schemas/users"
import UserController from "../controllers/users.controller";

let router = express.Router();

router.post("/login", validateBody(UserSchema.login), UserController.login);

export default router;