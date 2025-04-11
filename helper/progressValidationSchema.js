const Joi = require("joi");
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const progressSchema = Joi.object({
  studentId: Joi.string().required().messages({
    "string.empty": "Student ID is required",
    "any.required": "Student ID is required",
  }),

  courseId: Joi.string().required().messages({
    "string.empty": "Course ID is required",
    "any.required": "Course ID is required",
  }),

  progressValue: Joi.number().min(0).max(100).required().messages({
    "number.base": "Progress Value must be a valid number",
    "number.min": "Progress value cannot be less than 0%",
    "number.max": "Progress value cannot exceed 100%",
    "any.required": "Progress value is required",
  }),
});

const updateProgressSchema = Joi.object({
  studentId: Joi.string().pattern(objectIdPattern).messages({
    "string.pattern.base": "Student ID must be a valid MongoDB ObjectId",
  }),

  courseId: Joi.string().pattern(objectIdPattern).messages({
    "string.pattern.base": "Course ID must be a valid MongoDB ObjectId",
  }),

  progressValue: Joi.number().min(0).max(100).required().messages({
    "number.base": "Progress Value must be a valid number",
    "number.min": "Progress value cannot be less than 0%",
    "number.max": "Progress value cannot exceed 100%",
    "any.required": "Progress value is required",
  }),
});

module.exports = { progressSchema, updateProgressSchema };
