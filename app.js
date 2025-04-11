const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/EnrollmentRoutes");
const progressRoutes = require("./routes/ProgressRoutes");
const passport = require("passport");
require("./config/passport");

const app = express();

// Connect to Database
//connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the E-Learning Course Management API! Go to /api-docs for documentation.");
});
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/auth", authRoutes); // Add OAuth routes

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle undefined routes (404)
app.use(notFound);

//Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
