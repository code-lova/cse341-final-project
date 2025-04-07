const EnrollmentSchema = require("../helper/enrollmentValidationSchema");
const createHttpError = require("http-errors");

const validateCreateEnrollment = (req, res, next) => {
  const { error } = EnrollmentSchema.enrollmentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

const validateUpdateEnrollment = (req, res, next) => {
  const { error } = EnrollmentSchema.UpdateEnrollmentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

module.exports = { validateCreateEnrollment, validateUpdateEnrollment };
