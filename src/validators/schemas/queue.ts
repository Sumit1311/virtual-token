import Joi from "joi";

export const add = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
});