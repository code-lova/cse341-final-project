const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
} = require("../controllers/CourseController");

const validateCourse = require("../middleware/CourseValidator");
const authorizeRole = require("../middleware/authorizeRole");
const authenticateUser = require("../middleware/authMiddleware");

/**
 * @route POST /api/courses/create
 * @desc Create a new course (instructor only)
 */
router.post(
  "/create",
  authenticateUser,
  authorizeRole("instructor"),
  validateCourse.validateCreateCourse,
  createCourse
);

/**
 * @route PUT /api/courses/update/:id
 * @desc require authentication, update a course by id (Instructors only)
 */
router.put(
  "/update/:id",
  authenticateUser,
  authorizeRole("instructor"),
  validateCourse.validateUpdateCourse,
  updateCourse
);

/**
 * @route GET /api/courses
 * @desc Get all courses - task for Andre
 */
router.get("/", authenticateUser, getCourses);

/**
 * @route GET /api/courses/:id
 * @desc Get a course by ID task for Andre
 */
router.get("/:id", authenticateUser, getCourseById);

/**
 * @route DELETE /api/courses/:id
 * @desc Delete a course by ID (Instructor only)
 */
router.delete("/:id", authenticateUser, authorizeRole("instructor"), deleteCourse);

module.exports = router;
