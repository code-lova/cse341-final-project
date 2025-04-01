const express = require("express");
const router = express.Router();
const {
  createEnrollment,
  //   getEnrollment,
  deleteEnrollment,
} = require("../controllers/EnrollmentController");

const validateEnrollment = require("../middleware/EnrollmentValidator");
//const authorizeRole = require("../middleware/authorizeRole");
//const authenticateUser = require("../middleware/authMiddleware");

/**
 * @route POST /api/enrollments/create
 * @desc Enroll for a new course (Students)
 */
router.post("/create", validateEnrollment.validateCreateEnrollment, createEnrollment);

/**
 * @route GET /api/enrollments
 * @desc Get all enrollement - task for Andre
 */
//router.get("/", getEnrollments);

/**
 * @route DELETE /api/enrollments/:id
 * @desc Unenroll from a course by (students only)
 */
router.delete("/:id", deleteEnrollment);

module.exports = router;
