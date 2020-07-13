import * as joiHelper from '../../helpers/joi'
import { SchemaLike } from 'joi';
import { Request, Response, NextFunction } from 'express';
import ResponseBuilder from '../../helpers/http/ResponseBuilder';

export const validateBody = (schema: SchemaLike) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const response = ResponseBuilder.getDefaultResponse();
        const error = joiHelper.validateObjectSchema(req.body, schema);
        if (error) {
            response.body = error;
            return res.status(response.status).send(response);
        }
        return next();
    }
};