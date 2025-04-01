const createHttpError = require("http-errors");
const progressService = require("../services/progressService");
const courseService = require("../services/courseService");

// Update progress
exports.updateProgress = async (req, res, next) => {
  /*
    #swagger.tags = ['Progress']
    #swagger.summary = 'Update course progress (Instructors only)'
    #swagger.description = 'Updates the progress percentage for a student in a specific course. Requires Google OAuth2 authentication'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Progress details',
      required: true,
      schema: { $ref: '#/definitions/progressInput' }
    }
    #swagger.responses[200] = { description: 'Progress updated successfully' }
    #swagger.responses[400] = { description: 'Validation error' }
    #swagger.responses[404] = { description: 'Course not found' }
    #swagger.responses[500] = { description: 'Failed to update progress' }
  */
  const { studentId, courseId, progressValue } = req.body;
  //const studentId = req.user.id;

  try {
    // Check if the course exists
    const courseExists = await courseService.findCourseById(courseId);
    if (!courseExists) {
      return next(createHttpError(404, "Course not found"));
    }
    const updatedProgress = await progressService.updateProgress(
      studentId,
      courseId,
      progressValue
    );
    if (!updatedProgress) {
      return next(createHttpError(500, "Failed to update progress"));
    }
    return res.status(200).json(updatedProgress);
  } catch (error) {
    next(error);
  }
};

// Get progress
exports.getProgress = async (req, res, next) => {
  /*
    #swagger.tags = ['Progress']
    #swagger.summary = 'Retrieve student progress'
    #swagger.description = 'Fetches the progress percentage of a student in a specific course.'
    #swagger.responses[200] = { description: 'Progress retrieved successfully' }
    #swagger.responses[404] = { description: 'Progress data not found' }
    #swagger.responses[500] = { description: 'Server error' }
  */
  const { studentId, courseId } = req.params;

  try {
    const progress = await progressService.getProgress(studentId, courseId);
    if (!progress) {
      return next(createHttpError(404, "No progress data found"));
    }
    return res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};
