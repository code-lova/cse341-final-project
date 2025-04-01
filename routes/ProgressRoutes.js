const express = require("express");
const router = express.Router();
const {
  updateProgress,
  //getProgress,
} = require("../controllers/progressController");

const validateProgress = require("../middleware/ProgressValidator");
//const authorizeRole = require("../middleware/authorizeRole");
//const authenticateUser = require("../middleware/authMiddleware");

/**
 * @route POST /api/progress/update
 * @desc Update progress for student course (instructor access only)
 */
router.post("/update", validateProgress.validateCreateProgress, updateProgress);

/**
 * @route GET /api/progress/:userId/:courseId -- Task for Andre
 * @desc Get progress of a student for a specific course
 */
// router.get("/:studentId/:courseId", getProgress);

module.exports = router;
