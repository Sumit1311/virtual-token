import { Response, NextFunction } from "express";
import constants from "../../constants";
import { verifyToken } from "../../helpers/jwt";
import UserService from "../../services/user.service";
import { handleError } from "../../helpers/error";
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
        response = handleError(error);
        console.log(error);
        return res.status(HttpStatus.OK).send(response.getResponse()).end();
    }
}