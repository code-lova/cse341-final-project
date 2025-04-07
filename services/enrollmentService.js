const Enrollment = require("../models/Enrollment");

// Create a new studnet enrollment
const createNewEnrollment = async (data) => {
  return await Enrollment.create(data);
};

// Find if a student is already enrolled in a course
const findEnrollment = async (studentId, courseId) => {
  return await Enrollment.findOne({ studentId, courseId });
};

// Get all enrollments -- Task for Andre
//------ complete teh code here for getAllEnrollments-----

// Delete an enrollment by ID
const deleteEnrollment = async (id) => {
  return await Enrollment.findByIdAndDelete(id);
};

module.exports = {
  createNewEnrollment,
  findEnrollment,
  // getAllEnrollments,
  deleteEnrollment,
};
