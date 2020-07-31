import Joi from "joi";

export const login = Joi.object({
    userName: Joi.string().required(),
    password:Joi.string().required()
});