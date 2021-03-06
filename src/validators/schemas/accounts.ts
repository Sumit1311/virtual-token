import Joi from "joi";

export const create = Joi.object({
    phoneNumber: Joi.string().required(),
    sid: Joi.string().required(),
    authToken: Joi.string().required(),
    mobileNo: Joi.string().required()
});