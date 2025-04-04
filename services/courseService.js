const Course = require("../models/Courses");

// Create a new contact
const createNewCourse = async (data) => {
  return await Course.create(data);
};

//Find course by title
const findCourseTitle = async (title) => {
  return await Course.findOne({ title });
};

// Check if a course exists by ID
const findCourseById = async (courseId) => {
  return await Course.findById(courseId);
};

//Update a course by id and it body
const updateCourse = async (id, data) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

// Fetch all Course -- Task for Andre
const getAllCourses = async () => {
  return await Course.find();
};

// get a course by Id -- Task for Andre
const getCourseById = async (id) => {
  return await Course.findById(id);
};

// Delete a Task
const deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};

module.exports = {
  createNewCourse,
  findCourseTitle,
  updateCourse,
  getAllCourses,
  getCourseById,
  findCourseById,
  deleteCourse,
};
