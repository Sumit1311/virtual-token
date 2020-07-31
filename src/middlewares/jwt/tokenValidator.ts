import { Response, NextFunction } from "express";
import constants from "../../constants";
import { verifyToken } from "../../helpers/jwt";
import UserService from "../../services/user.service";
import IValidatedRequest from "../../helpers/jwt/IValidatedRequest";
import { isHandledError } from "../../helpers/error";
import HttpStatus from "http-status-codes";
import ResponseBuilder from "../../helpers/http/ResponseBuilder";

export default async function tokenValidator(req: any, res: Response, next: NextFunction) {
    let response = ResponseBuilder.getDefaultResponse();
    try {
        if (!req.headers.authorization) {
            throw new Error(constants.TOKEN_MISSING);
        }
        const token = req.headers.authorization.split('Bearer')[1].trim();
        const payload = await verifyToken(token);
        const user = await new UserService().verifyUser(payload);
        req.user = user;
        return next();
    } catch (error) {
        const errorResponse = isHandledError(error.message)

        if (errorResponse === null) {
            response.setBody({ error: error.message });
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            response = errorResponse;
            response.setStatus(HttpStatus.UNAUTHORIZED);
        }
        console.log(error);
        return res.status(response.getResponse().status).send(response.getResponse()).end();
    }
}