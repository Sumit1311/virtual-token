import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import WebhooksRouter from "./routes/webhooks.router";
import HttpStatus from "http-status-codes";

dotenv.config();

let app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/webhooks', new WebhooksRouter().getExpressRouter());

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


