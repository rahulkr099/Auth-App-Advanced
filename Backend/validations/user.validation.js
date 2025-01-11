const Joi = require("joi");

const signupSchema = Joi.object({
    firstName: Joi.string().min(3).required().messages({
        "string.empty": "First Name is required",
        "string.min": "First Name must be at least 3 characters long",
    }),
    lastName: Joi.string().min(3).required().messages({
        "string.empty": "Last Name is required",
        "string.min": "Last Name must be at least 3 characters long",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
    }),
    role: Joi.string().valid("user", "admin").required().messages({
        "string.empty": "Role is required",
        "any.only": "Role must be either 'user' or 'admin'",
    }),
});

// Define the Joi schema for validation
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
    }),
});



module.exports = {loginSchema, signupSchema};