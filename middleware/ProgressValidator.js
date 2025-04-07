const ProgressSchema = require("../helper/progressValidationSchema");
const createHttpError = require("http-errors");

const validateCreateProgress = (req, res, next) => {
  const { error } = ProgressSchema.progressSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

const validateUpdateProgress = (req, res, next) => {
  const { error } = ProgressSchema.updateProgressSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return next(createHttpError(400, `Validation Error: ${errorMessages.join(", ")}`));
  }

  next();
};

module.exports = { validateCreateProgress, validateUpdateProgress };
