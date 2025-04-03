
# ✅ API Testing Checklist - CSE341 Final Project

## 📁 /api/courses
| Method | Endpoint             | Purpose                    | What to test            |
|--------|----------------------|----------------------------|--------------------------|
| GET    | /api/courses         | Retrieve all courses       | Basic fetch              |
| GET    | /api/courses/:id     | Retrieve course by ID      | Valid and invalid ID     |
| POST   | /api/courses         | Create new course          | Valid course JSON        |
| PUT    | /api/courses/:id     | Update course              | Valid ID and body        |
| DELETE | /api/courses/:id     | Delete course              | Valid and invalid ID     |

## 📁 /api/enrollments
| Method | Endpoint               | Purpose                       | What to test               |
|--------|------------------------|-------------------------------|-----------------------------|
| GET    | /api/enrollments       | Retrieve all enrollments      | Basic fetch                 |
| POST   | /api/enrollments       | Enroll in a course            | Valid course & student ID   |
| DELETE | /api/enrollments/:id   | Unenroll from a course        | Valid enrollment ID         |

## 📁 /api/users
| Method | Endpoint           | Purpose                      | What to test               |
|--------|--------------------|------------------------------|-----------------------------|
| GET    | /api/users         | Retrieve all users           | Exclude password            |
| GET    | /api/users/:id     | Retrieve user by ID          | Valid and invalid ID        |
| POST   | /api/users         | Create new user              | Valid JSON with password    |
| PUT    | /api/users/:id     | Update user info             | Valid ID and data           |
| DELETE | /api/users/:id     | Delete user                  | Valid ID                    |

## 📁 /api/progress
| Method | Endpoint                            | Purpose                      |
|--------|-------------------------------------|-------------------------------|
| GET    | /api/progress/:studentId/:courseId  | Get student progress         |
| POST   | /api/progress                       | Update student progress      |

## 🔒 General Checks
- [ ] `/api-docs` opens Swagger UI correctly
- [ ] API returns appropriate status codes (`404`, `400`, `500`, etc.)
- [ ] Passwords are excluded from all responses
- [ ] Error handling middleware returns clean messages
- [ ] OAuth-protected routes return `401 Unauthorized` if token missing
