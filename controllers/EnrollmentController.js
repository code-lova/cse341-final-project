const createHttpError = require("http-errors");
const enrollmentService = require("../services/enrollmentService");
const courseService = require("../services/courseService"); // Import course service


// Create a new Enrollment
exports.createEnrollment = async (req, res, next) => {
  /*
    #swagger.tags = ['Enrollment']
    #swagger.summary = 'Enroll for a new Course'
    #swagger.description = 'Creates a new enrollment detail. Requires Google OAuth2 authentication'.
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'enrollment details',
      required: true,
      schema: { $ref: '#/definitions/enrollmentInput' }
    }
    #swagger.responses[400] = { description: 'Validation Error' }
    #swagger.responses[404] = { description: 'Course not found' }
    #swagger.responses[409] = { description: 'Student already enrolled in this course' }
    #swagger.responses[500] = { description: 'Failed to create course' }
  */
  const { studentId, courseId } = req.body;
  //const studentId = req.user.id;

  try {
    // Check if the course exists
    const courseExists = await courseService.findCourseById(courseId);
    if (!courseExists) {
      return next(createHttpError(404, "Course not found"));
    }

    const existingEnrollment = await enrollmentService.findEnrollment(studentId, courseId);
    if (existingEnrollment) {
      return next(createHttpError(409, "You are already enrolled in this course"));
    }

    const data = { studentId, courseId };
    const newEnrollment = await enrollmentService.createNewEnrollment(data);
    if (!newEnrollment) {
      return next(createHttpError(500, "Failed to create new course"));
    }
    return res.status(201).json(newEnrollment);
  } catch (error) {
    next(error);
  }
};

// Fetch all enrollment details -- Task for Andre
exports.getEnrollments = async (req, res, next) => {
  /*
    #swagger.tags = ['Enrollment']
    #swagger.summary = 'Retrieve all enrollment'
    #swagger.description = 'Fetches all enrollment from the database. Will Requires Google OAuth2 authentication.'
    #swagger.responses[200] = {
      description: 'List of student enrollment retrieved successfully',
      schema: { $ref: '#/definitions/Enrollment' }
    }
    #swagger.responses[404] = { description: 'No enrollment data found' }
    #swagger.responses[500] = { description: 'Server error' }
  */


    // WRITE THE CODE TO COMPLETE THIS FUNCTION - TASK FOR ANDRE
 
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res, next) => {
  /*
      #swagger.tags = ['Enrollment']
      #swagger.summary = 'Unenroll from a course'
      #swagger.description = 'Removes an enrollment by ID. Requires Google OAuth2 authentication.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the enrollment to delete',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = { description: 'Enrollment deleted successfully' }
      #swagger.responses[404] = { description: 'Enrollment not found' }
      #swagger.responses[500] = { description: 'Failed to delete enrollment' }
    */
  const { id } = req.params;
  try {
    const deletedEnrollment = await enrollmentService.deleteEnrollment(id);
    if (!deletedEnrollment) {
      return next(createHttpError(404, "Enrollment not found"));
    }
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
