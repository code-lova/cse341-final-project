const Progress = require("../models/Progress");

// Update progress for a student in a course
const updateProgress = async (studentId, courseId, progressValue) => {
  return await Progress.findOneAndUpdate(
    { studentId, courseId, progressValue },
    { new: true, upsert: true }
  );
};

// Get progress for a student in a course -- Task for Andre
// ----- complete the code here for getProgress------

module.exports = {
  updateProgress,
  //getProgress,
};
