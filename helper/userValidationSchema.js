const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 100 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  role: Joi.string().valid("student", "instructor").default("student").messages({
    "any.only": "Role must be either 'student' or 'instructor'",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 100 characters",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email address",
  }),

  password: Joi.string().min(6).messages({
    "string.min": "Password must be at least 6 characters",
  }),

  role: Joi.string().valid("student", "instructor").messages({
    "any.only": "Role must be either 'student' or 'instructor'",
  }),
});

module.exports = { createUserSchema, updateUserSchema };
