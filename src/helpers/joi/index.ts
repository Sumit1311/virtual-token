import Joi, { SchemaLike } from "joi"

export const validateObjectSchema = (data: any, schema: SchemaLike) => {
    const result = Joi.validate(data, schema, { convert: false });
    if (result.error) {
        const errorDetails = result.error.details.map(value => {
            return {
                error: value.message,
            };
        });
        return errorDetails;
    }
    return null;
};