import { Request, Response } from "express";
import ResponseBuilder, { APIResponse } from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";
import LoginDTO from "../dto/LoginDTO";
import { handleError } from "../helpers/error";
import UserService from "../services/user.service";

export default class UserController {
    static userService: UserService = new UserService();

    static async login(req: Request, res: Response) {
        let response;
        try {
            response = ResponseBuilder.getDefaultResponse();
            const body = new LoginDTO(req.body);
            response.setBody(await UserController.userService.login(body));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }
}