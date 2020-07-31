import Joi from "joi";

export const create = Joi.object({
    phoneNumber: Joi.string().required(),
    sid: Joi.string().required(),
    authToken: Joi.string().required(),
    mobileNo: Joi.string().required(),
    notificationTypes: Joi.number().required(),
    name: Joi.string().required(),
    missedCallNumber: Joi.string().required()
});

export const signup = Joi.object({
    orgName: Joi.string().required(),
    mobileNo: Joi.string().required(),
    password: Joi.string().required()
});

export const update = Joi.object({
    missedCallNumber: Joi.string().required()
});