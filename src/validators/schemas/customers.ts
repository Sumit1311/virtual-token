import Joi from "joi";

export const update = Joi.object({
    queueId: Joi.string().required(),
    active: Joi.boolean().required()
});