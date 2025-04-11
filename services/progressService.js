const Progress = require("../models/Progress");

// Create progress for a student in a course
const createProgress = async (studentId, courseId, progressValue) => {
  return await Progress.create({ studentId, courseId, progressValue });
};

// Get progress for all student -- Task for Andre
// ----- complete the code here for getProgress------
const getProgress = async () => {
  return await Progress.find().populate([
    {
      path: "studentId",
      select: "-password",
    },
    {
      path: "courseId",
    },
  ]);
};

// Update progress explicitly
const updateProgress = async (id, updateData) => {
  return await Progress.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

// Delete progress
const deleteProgress = async (id) => {
  return await Progress.findOneAndDelete(id);
};

module.exports = {
  createProgress,
  getProgress,
  updateProgress,
  deleteProgress,
};
