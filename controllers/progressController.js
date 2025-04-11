const createHttpError = require("http-errors");
const progressService = require("../services/progressService");
const courseService = require("../services/courseService");
const userService = require("../services/userService");

// Update progress
exports.createProgress = async (req, res, next) => {
  /*
    #swagger.tags = ['Progress']
    #swagger.summary = 'Create course progress (Instructors only)'
    #swagger.description = 'Create the progress percentage for a student in a specific course. Requires Google OAuth2 authentication'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Progress details',
      required: true,
      schema: { $ref: '#/definitions/progressInput' }
    }
    #swagger.responses[200] = { description: 'Progress created successfully' }
    #swagger.responses[400] = { description: 'Validation Error' }
    #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
    #swagger.responses[404] = { description: 'Course not found' }
    #swagger.responses[500] = { description: 'Failed to update progress' }
  */
  const { studentId, courseId, progressValue } = req.body;

  try {
    // 1. Validate student existence and role
    const user = await userService.findUserById(studentId);
    if (!user) {
      return next(createHttpError(404, "Student not found"));
    }
    if (user.role !== "student") {
      return next(createHttpError(400, "User is not a student"));
    }

    // Check if the course exists
    const courseExists = await courseService.findCourseById(courseId);
    if (!courseExists) {
      return next(createHttpError(404, "Course not found"));
    }
    const createdProgress = await progressService.createProgress(
      studentId,
      courseId,
      progressValue
    );
    if (!createdProgress) {
      return next(createHttpError(500, "Failed to update progress"));
    }
    return res.status(200).json(createdProgress);
  } catch (error) {
    next(error);
  }
};

// Get progress -- TASK for Andre
exports.getAllProgress = async (req, res, next) => {
  /*
    #swagger.tags = ['Progress']
    #swagger.summary = 'Retrieve student progress'
    #swagger.description = 'Fetches the progress percentage of all students in a specific course, Requires Google OAuth2 authentication.'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.responses[200] = { description: 'Progress retrieved successfully' }
    #swagger.responses[404] = { description: 'Progress data not found' }
    #swagger.responses[500] = { description: 'Server error' }
  */
  // Please complete the code to get all progress
  try {
    const progress = await progressService.getProgress();
    if (!progress || progress.length === 0) {
      return next(createHttpError(404, "Progress data not found"));
    }
    return res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};

// PUT - Update progress
exports.updateProgress = async (req, res, next) => {
  /*
    #swagger.tags = ['Progress']
    #swagger.summary = 'Update student progress (Instructor only)'
    #swagger.description = 'Updates an existing progress by ID. Requires Google OAuth2 authentication.'
    #swagger.security = [{ BearerAuth: [] }]
     #swagger.parameters['id'] = {
      in: 'path',
      description: 'Progress ID to update',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated progress details',
      required: true,
      schema: { $ref: '#/definitions/progressInput' }
    }
    #swagger.responses[200] = { description: 'Progress updated successfully' }
    #swagger.responses[400] = { description: 'Validation error' }
    #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
    #swagger.responses[404] = { description: 'update failed or progress not found' }
    #swagger.responses[500] = { description: 'Server error' }
  */

  const id = req.params.id;
  const { studentId, courseId, progressValue } = req.body;

  try {
    // 1. Validate student existence and role
    const user = await userService.findUserById(studentId);
    if (!user) {
      return next(createHttpError(404, "Student not found"));
    }
    if (user.role !== "student") {
      return next(createHttpError(400, "User is not a student"));
    }

    const course = await courseService.findCourseById(courseId);
    if (!course) {
      return next(createHttpError(404, "Course not found"));
    }

    const updated = await progressService.updateProgress(id, {
      studentId,
      courseId,
      progressValue,
    });
    if (!updated) {
      return next(createHttpError(404, "Progress not found or update failed"));
    }
    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE - Delete progress
exports.deleteProgress = async (req, res, next) => {
  /*
      #swagger.tags = ['Progress']
      #swagger.summary = 'Remove a progress report (Must be authenticated and Instructors only)'
      #swagger.description = 'Removes a progress by ID. Requires Google OAuth2 authentication.'
      #swagger.security = [{ BearerAuth: [] }]

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the enrollment to delete',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = { description: 'Progress deleted successfully' }
      #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
      #swagger.responses[404] = { description: 'Progress not found' }
      #swagger.responses[500] = { description: 'Failed to delete progress' }
    */
  const id = req.params.id;
  try {
    const deleted = await progressService.deleteProgress(id);
    if (!deleted) return next(createHttpError(404, "Progress not found"));
    return res.status(200).json({ message: "Progress deleted successfully" });
  } catch (error) {
    next(error);
  }
};
