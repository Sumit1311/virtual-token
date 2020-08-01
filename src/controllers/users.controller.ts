import { Request, Response } from "express";
import ResponseBuilder, { APIResponse } from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";
import LoginDTO from "../dto/LoginDTO";
import { isHandledError } from "../helpers/error";
import UserService from "../services/user.service";

export default class UserController {
    static userService: UserService = new UserService();

    static async login(req: Request, res: Response) {
        let response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new LoginDTO(req.body);
            response.setBody(await UserController.userService.login(body));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            catchError(response, error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }
}

function catchError(response: APIResponse, error: Error) {
    const errorResponse = isHandledError(error.message)

    if (errorResponse === null) {
        response.setBody({ error: error.message });
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
        response = errorResponse;
    }
    console.log(error);
}