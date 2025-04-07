const Progress = require("../models/Progress");

// Create progress for a student in a course
const createProgress = async (studentId, courseId, progressValue) => {
  return await Progress.findOneAndUpdate(
    { studentId, courseId, progressValue },
    { new: true, upsert: true }
  );
};

// Get progress for a student in a course -- Task for Andre
// ----- complete the code here for getProgress------

// Update progress explicitly
const updateProgress = async (studentId, courseId, progressValue) => {
  return await Progress.findOneAndUpdate({ studentId, courseId }, { progressValue }, { new: true });
};

// Delete progress
const deleteProgress = async (studentId, courseId) => {
  return await Progress.findOneAndDelete({ studentId, courseId });
};

module.exports = {
  createProgress,
  //getProgress,
  updateProgress,
  deleteProgress,
};
