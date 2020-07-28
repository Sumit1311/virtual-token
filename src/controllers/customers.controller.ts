import { Request, Response } from "express";
import ResponseBuilder from "../helpers/http/ResponseBuilder";
import HttpStatus from "http-status-codes";
import CallCustomerDTO from "../dto/CallCustomerDTO";
import { isHandledError } from "../helpers/error";
import GetCustomersDTO from "../dto/GetCustomersDTO";
import CustomerService from "../services/customer.service";

export default class CustomerController {
    static customerService: CustomerService = new CustomerService();

    static async call(req: Request, res: Response) {
        const response = ResponseBuilder.getDefaultResponse();
        try {
            const body = new CallCustomerDTO(req.query);
            response.setBody(await CustomerController.customerService.call(body));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response.setBody({ error: error.message });
            if (!isHandledError(error.message)) {
                response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.log(error);
        }
        res.status(response.getResponse().status).send(response.getResponse()).end();
    }

    static async getCustomers(req:Request, res:Response) {
        const response = ResponseBuilder.getDefaultResponse();
        try {
            response.setBody(await CustomerController.customerService.getCustomers(new GetCustomersDTO(req.query)));
            response.setStatus(HttpStatus.OK);
        } catch (error) {
            response.setBody({ error: error.message });
            if (!isHandledError(error.message)) {
                response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.log(error);
        }
        res.status(response.getResponse().status).send(response.getResponse()).end();
    }
}