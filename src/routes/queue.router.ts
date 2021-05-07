import express from "express"
import { validateBody } from "../middlewares/joi";
import * as QueueSchema from "../validators/schemas/queue"
import QueueController from "../controllers/queue.controller";

let router = express.Router();

router.post("/add", validateBody(QueueSchema.add), QueueController.add);

export default router;