import { Request, Response } from "express";
import ResponseBuilder, { APIResponse } from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";
import CallCustomerDTO from "../dto/CallCustomerDTO";
import { handleError } from "../helpers/error";
import GetCustomersDTO from "../dto/GetCustomersDTO";
import CustomerService from "../services/customer.service";
import IValidatedRequest from "../helpers/jwt/IValidatedRequest";
import UpdateCustomerDTO from "../dto/UpdateCustomerDTO";

export default class CustomerController {
    static customerService: CustomerService = new CustomerService();

    static async call(req: Request, res: Response) {
        let response = ResponseBuilder.getDefaultResponse();
        let validatedRequest = <IValidatedRequest>req;
        try {
            const body = new CallCustomerDTO(validatedRequest);
            response.setBody(await CustomerController.customerService.call(body));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }

    static async getCustomers(req: Request, res: Response) {
        let response = ResponseBuilder.getDefaultResponse();
        try {
            response.setBody(await CustomerController.customerService.getCustomers(new GetCustomersDTO(<IValidatedRequest>req)));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }

    static async updateQueueRecord(req: Request, res: Response) {
        let response = ResponseBuilder.getDefaultResponse();
        try {
            response.setBody(await CustomerController.customerService.updateQueueRecord(new UpdateCustomerDTO(<IValidatedRequest>req, { ...req.params, ...req.body })));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response = handleError(error.message);
            console.log(error);
        }
        res.status(HttpStatus.OK).send(response.getResponse()).end();
    }
}