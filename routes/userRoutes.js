const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const validateUser = require("../middleware/userValidator");
//const authorizeRole = require("../middleware/authorizeRole");
//const authenticateUser = require("../middleware/authMiddleware");

/**
 * @route POST /api/users/register
 * @desc Register a new user
 */
router.post("/register", validateUser.validateCreateUser, registerUser);

/**
 * @route PUT /api/users/update/:id
 * @desc update a user by id (Accessible to all logged-in users)
 */
router.put("/update/:id", validateUser.validateUpdateUser, updateUser);

/**
 * @route GET /api/users
 * @desc Get all users (Accessible to all logged-in users) --  task for Andre
 */
router.get("/", getAllUsers);

/**
 * @route GET /api/users/:id
 * @desc Get a user by ID (Accessible to all logged-in users) -- task for Andre
 */
router.get("/:id", getUserById);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user by ID (Accessible to all logged-in users)
 */
router.delete("/:id", deleteUser);

module.exports = router;
