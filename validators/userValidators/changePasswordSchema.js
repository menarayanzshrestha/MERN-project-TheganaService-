const Joi = require('@hapi/joi');

const changePasswordSchema = Joi.object().keys({
    password: Joi.string().min(5).max(22).required(),
    confirmPassword: Joi.string().min(5).max(22).valid(Joi.ref('password')).required()
});

module.exports = changePasswordSchema;