import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import webhooksRouter from "./routes/webhooks.router";
import accountsRouter from "./routes/accounts.router";
import HttpStatus from "http-status-codes";
import * as db from "./database/";

let app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/accounts', accountsRouter);
app.use('/webhooks', webhooksRouter);

app.get('/', (req, res, next) => {
    return res.status(200).send({ message: 'Welcome to virtual token APIs' });
});

app.get('*', function (req, res, next) {
    return res.status(404).send({ message: 'APIs route not found' });
});

// error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Something went wrong ${err.message}`);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        body: {}
    });
});

app.listen(port, async () => {
    try {
        console.log(`Server listening on port ${port}`);
        await db.connect();
    } catch (error) {
        console.error(error);
    }
});