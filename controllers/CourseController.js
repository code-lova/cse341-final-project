const createHttpError = require("http-errors");
const courseService = require("../services/courseService");

// Create a new task
exports.createCourse = async (req, res, next) => {
  /*
    #swagger.tags = ['Courses']
    #swagger.summary = 'Create a new Course'
    #swagger.description = 'Creates a new course detail. Requires Google OAuth2 authentication'.
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'course details',
      required: true,
      schema: { $ref: '#/definitions/courseInput' }
    }
    #swagger.responses[400] = { description: 'Validation Error' }
    #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
    #swagger.responses[500] = { description: 'Failed to create course' }
  */
  const { title, description, duration, amount, courseType } = req.body;
  const instructor = req.user.id;

  try {
    const existingCourse = await courseService.findCourseTitle(title);
    if (existingCourse) {
      return next(createHttpError(409, "Task title already exists"));
    }

    const data = { title, description, instructor, duration, amount, courseType };
    const newCourse = await courseService.createNewCourse(data);
    if (!newCourse) {
      return next(createHttpError(500, "Failed to create new course"));
    }
    return res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

// Fetch all task details -- Task for Andre
exports.getCourses = async (req, res, next) => {
  /*
    #swagger.tags = ['Courses']
    #swagger.summary = 'Retrieve all courses'
    #swagger.description = 'Fetches all courses from the database. Will Requires Google OAuth2 authentication.'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.responses[200] = {
      description: 'List of courses retrieved successfully',
      schema: { $ref: '#/definitions/Course' }
    }
    #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
    #swagger.responses[404] = { description: 'No course data found' }
    #swagger.responses[500] = { description: 'Server error' }
  */

  try {
    //find all courses
    const courses = await courseService.getAllCourses();

    //check if courses is empty

    if (!courses || courses.length === 0) {
      return next(createHttpError(404, "No Course data found"));
    }
    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Update a task
exports.updateCourse = async (req, res, next) => {
  /*
   #swagger.tags = ['Courses']
    #swagger.summary = 'Update course by Id (Instructor only)'
    #swagger.description = 'Updates an existing course. Requires Google OAuth2 authentication.'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Course ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated course details',
      required: true,
      schema: { $ref: '#/definitions/courseInput' }
    }
  */
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(createHttpError(400, "Request body cannot be empty"));
  }

  const id = req.params.id;

  try {
    const updatedCourse = await courseService.updateCourse(id, req.body);
    if (!updatedCourse) {
      throw createHttpError(404, "Course not found");
    }
    return res.json({
      updatedCourse,
      message: "Course updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// fetch course by id -- task for Andre
exports.getCourseById = async (req, res, next) => {
  /*
    #swagger.tags = ['Courses']
    #swagger.summary = 'Retrieve a course by ID'
    #swagger.description = 'Fetches course by ID. Will Requires Google OAuth2 authentication'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the course to retrieve',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Course details retrieved successfully',
      schema: { $ref: '#/definitions/Course' }
    }
    #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
    #swagger.responses[404] = { description: 'Course not found' }
    #swagger.responses[500] = { description: 'Failed to fetch course details' }
  */

  try {
    const id = req.params.id;

    const course = await courseService.findCourseById(id);

    if (!course) {
      return next(createHttpError(404, "Course not found"));
    }

    return res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

//Delete a task
exports.deleteCourse = async (req, res, next) => {
  /*
    #swagger.tags = ['Courses']
    #swagger.summary = 'Delete a Course (Instructor only)'
    #swagger.description = 'Deletes a course by ID. Will Requires Google OAuth2 authentication'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the course to delete',
      required: true,
      type: 'string'
    }
    #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
    #swagger.responses[200] = { description: 'course deleted successfully' }
    #swagger.responses[404] = { description: 'course not found' }
    #swagger.responses[500] = { description: 'Failed to delete course' }
  */
  const id = req.params.id;
  try {
    const deletedCourse = await courseService.deleteCourse(id);
    if (!deletedCourse) {
      return next(createHttpError(404, "Course not found"));
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};
