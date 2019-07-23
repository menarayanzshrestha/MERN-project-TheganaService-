const Joi = require('@hapi/joi');

const loginSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).max(22).required()
});

module.exports = loginSchema;
