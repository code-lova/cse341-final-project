const Joi = require("joi");

const createtCourseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
  }),

  description: Joi.string().min(5).max(500).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
    "string.max": "Description must not exceed 500 characters",
  }),

  duration: Joi.string().required().messages({
    "string.empty": "Duration is required",
  }),

  amount: Joi.number()
    .required()
    .precision(2) // Allows up to 2 decimal places
    .required()
    .messages({
      "number.base": "Amount must be a valid number",
      "number.precision": "Amount must have at most two decimal places",
      "number.empty": "Amount is required",
    }),

  courseType: Joi.string().valid("free", "paid").default("free").messages({
    "any.only": "CourseType must be 'free' or 'paid'",
  }),

});

const updateCourseSchema = Joi.object({
  title: Joi.string().min(3).max(100).messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
  }),

  description: Joi.string().min(5).max(500).messages({
    "string.min": "Description must be at least 5 characters",
    "string.max": "Description must not exceed 500 characters",
  }),

  duration: Joi.string(),

  amount: Joi.number()
    .required()
    .precision(2) // Allows up to 2 decimal places
    .messages({
      "number.empty": "Amount is required",
      "number.base": "Amount must be a valid number",
      "number.precision": "Amount must have at most two decimal places",
    }),

  courseType: Joi.string().valid("free", "paid").default("free").messages({
    "any.only": "CourseType must be 'free' or 'paid'",
  }),

  instructor: Joi.string(),
  students: Joi.string(),
});

module.exports = { createtCourseSchema, updateCourseSchema };
