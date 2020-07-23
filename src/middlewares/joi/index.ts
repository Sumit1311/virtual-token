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

export const validateQuery = (schema: SchemaLike) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const response = ResponseBuilder.getDefaultResponse();
        const error = joiHelper.validateObjectSchema(req.query, schema);
        if (error) {
            response.setBody(error);
            return res.status(response.getResponse().status).end(response.getResponse());
        }
        return next();
    }
};