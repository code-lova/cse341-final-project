const express = require("express");
const router = express.Router();
const {
  createProgress,
  getProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/progressController");

const validateProgress = require("../middleware/ProgressValidator");
const authorizeRole = require("../middleware/authorizeRole");
const authenticateUser = require("../middleware/authMiddleware");

/**
 * @route POST /api/progress/create
 * @desc Create progress for student course (instructor access only)
 */
router.post(
  "/create",
  authenticateUser,
  authorizeRole("instructor"),
  validateProgress.validateCreateProgress,
  createProgress
);

/**
 * @route GET /api/progress/:userId/:courseId -- Task for Andre
 * @desc Get progress of a student for a specific course
 */
//router.get("/:studentId/:courseId", getProgress);

/**
 * @route PUT /api/progress/:studentId/:courseId
 * @desc Update progress of a student for a specific course
 */
// PUT - Update progress
router.put(
  "/:studentId/:courseId",
  authenticateUser,
  authorizeRole("instructor"),
  validateProgress.validateUpdateProgress,
  updateProgress
);

/**
 * @route DELETE /api/progress/:studentId/:courseId
 * @desc Delete progress of a student for a specific course
 */
// DELETE - Delete progress
router.delete(
  "/:studentId/:courseId",
  authenticateUser,
  authorizeRole("instructor"),
  deleteProgress
);

module.exports = router;
