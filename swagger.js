const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "E-Learning Course Management API",
    description: `
    API for managing courses, enrollment, progress and users.
    
    **Authentication Process:**
    - Visit: [Google OAuth Login](https://cse341-final-project-r9c4.onrender.com/api/auth/google)
    - Authenticate and get a token from the response.
    - Click **Authorize** (🔑) in Swagger UI and enter your token as: **Bearer your_auth_token**.
    - Now, all secured endpoints will be accessible.`,
    version: "1.0.0",
  },
  host: "localhost:8080", //"cse341-final-project-r9c4.onrender.com",  // Change this when deploying
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Users", description: "User management endpoints" },
    { name: "Courses", description: "Course management endpoints" },
    { name: "Enrollment", description: "Student enrollment endpoints" },
    { name: "Progress", description: "Student progress endpoints" },
  ],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: `
      **Authentication Required**
      - First, visit: [Google OAuth Login](https://cse341-final-project-r9c4.onrender.com/api/auth/google)
      - Copy the returned token.
      - Click **Authorize** (🔑) at the top and enter: **Bearer your_auth_token**.`,
    },
  },
  definitions: {
    User: {
      id: "12345673884495",
      name: "John",
      email: "johndoe@example.com",
      role: "student",
      createdAt: "2025-03-17T10:05:00Z",
      updatedAt: "2025-03-18T15:02:59.926Z",
      __v: 0,
    },
    UserInput: {
      name: "Rebecca Jordan",
      email: "rebecca2009@gmail.com",
      role: "student",
      password: "secure123",
    },
    Course: {
      instructor: "123664849955",
      title: "CSE-341 Backend Services",
      description:
        "This is a course that will teach you techniques and ways to use node js to build api.",
      duration: "1 Month",
      amount: "0.00",
      courseType: "free",
      createdAt: "2025-04-17T10:05:00Z",
      updatedAt: "2025-04-18T13:32:46.952Z",
      __v: 0,
    },
    courseInput: {
      title: "BUS-301 Business Test Course",
      description: "This is a course that will teach you how to become effective professionally.",
      duration: "2 Month",
      amount: "0.00",
      courseType: "free",
    },
    Enrollment: {
      studentId: "67d955d87203c86c07e8427a",
      courseId: "67d955d87203c86c07e8427a",
      createdAt: "2025-04-17T10:05:00Z",
      updatedAt: "2025-04-18T13:32:46.952Z",
      __v: 0,
    },
    enrollmentInput: {
      studentId: "67ec033a833d5bc4560e4e14",
      courseId: "67f443850e7dbb18d75d60cb",
    },
    Progress: {
      studentId: "67d955d87203c86c07e8427a",
      courseId: "67d955d87203c86c07e8427a",
      progressValue: 80,
      createdAt: "2025-04-17T10:05:00Z",
      updatedAt: "2025-04-18T13:32:46.952Z",
      __v: 0,
    },
    progressInput: {
      studentId: "67ec033a833d5bc4560e4e14",
      courseId: "67f443850e7dbb18d75d60cb",
      progressValue: 65,
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const fs = require("fs");

  // Load the generated swagger file
  const swaggerData = require("./swagger.json");

  // List of paths to exclude
  const excludePaths = ["/api/auth/google", "/api/auth/google/callback"];

  // Remove unwanted paths
  swaggerData.paths = Object.keys(swaggerData.paths)
    .filter((path) => !excludePaths.includes(path))
    .reduce((filteredPaths, key) => {
      filteredPaths[key] = swaggerData.paths[key];
      return filteredPaths;
    }, {});

  // Write back the filtered Swagger JSON
  fs.writeFileSync(outputFile, JSON.stringify(swaggerData, null, 2));
});
