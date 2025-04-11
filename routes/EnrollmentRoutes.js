const express = require("express");
const router = express.Router();
const {
  createEnrollment,
  getEnrollments,
  updateEnrollment,
  deleteEnrollment,
} = require("../controllers/EnrollmentController");

const validateEnrollment = require("../middleware/EnrollmentValidator");
//const authorizeRole = require("../middleware/authorizeRole");
const authenticateUser = require("../middleware/authMiddleware");

/**
 * @route POST /api/enrollments/create
 * @desc Enroll for a new course (Students)
 */
router.post(
  "/create",
  authenticateUser,
  validateEnrollment.validateCreateEnrollment,
  createEnrollment
);

/**
 * @route PUT /api/enrollments/:id
 * @desc Update an enrollment (e.g. change course, logged in users only)
 */
router.put(
  "/update/:id",
  authenticateUser,
  validateEnrollment.validateUpdateEnrollment,
  updateEnrollment
);

/**
 * @route GET /api/enrollments
 * @desc Get all enrollement - task for Andre
 */
router.get("/", authenticateUser, getEnrollments);

/**
 * @route DELETE /api/enrollments/:id
 * @desc Unenroll from a course by (students and instructor can access only)
 */
router.delete("/:id", authenticateUser, deleteEnrollment);

module.exports = router;
