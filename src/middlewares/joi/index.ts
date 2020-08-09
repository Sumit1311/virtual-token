import * as joiHelper from '../../helpers/joi'
import { SchemaLike } from 'joi';
import { Request, Response, NextFunction } from 'express';
import ResponseBuilder from '../../helpers/http/ResponseBuilder';

export const validateBody = (schema: SchemaLike) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const response = ResponseBuilder.getDefaultResponse();
        const error = joiHelper.validateObjectSchema(req.body, schema);
        if (error) {
            response.setBody(error);
            return res.status(response.getResponse().status).send(response.getResponse());
        }
        return next();
    }
};

export const validateParamAndBody = (schema: SchemaLike) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const response = ResponseBuilder.getDefaultResponse();
        const error = joiHelper.validateObjectSchema({ ...req.body, ...req.params }, schema);
        if (error) {
            response.setBody(error);
            return res.status(response.getResponse().status).send(response.getResponse());
        }
        return next();
    }
};

export const validateQuery = (schema: SchemaLike) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const response = ResponseBuilder.getDefaultResponse();
        const error = joiHelper.validateObjectSchema(req.query, schema);
        if (error) {
            response.setBody(error[0]);
            return res.status(response.getResponse().status).send(response.getResponse()).end();
        }
        console.log("Call next");
        return next();
    }
};