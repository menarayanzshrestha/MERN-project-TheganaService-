const Joi = require('@hapi/joi');

const signupSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).max(22).required(),
    confirmPassword: Joi.string().min(5).max(22).valid(Joi.ref('password')).required(),
    role: Joi.any().valid("admin", "developer", "manager")
});

module.exports = signupSchema;
