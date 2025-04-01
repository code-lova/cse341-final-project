const courseSchema = require("../helper/courseValidationSchema");
const createHttpError = require("http-errors");

const validateCreateCourse = (req, res, next) => {
  const { error } = courseSchema.createtCourseSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

const validateUpdateCourse = (req, res, next) => {
  const { error } = courseSchema.updateCourseSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

module.exports = { validateCreateCourse, validateUpdateCourse };
