const Joi = require("joi");

const enrollmentSchema = Joi.object({
  studentId: Joi.string().required().messages({
    "string.empty": "Student ID is required",
    "any.required": "Student ID is required",
  }),

  courseId: Joi.string().required().messages({
    "string.empty": "Course ID is required",
    "any.required": "Course ID is required",
  }),
});

module.exports = { enrollmentSchema };
