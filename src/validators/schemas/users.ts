import Joi from "joi";

export const login = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
});

export const renewLogin = Joi.object({
    jwtToken: Joi.string().required()
})