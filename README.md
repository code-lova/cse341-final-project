# 📘 CSE 341 Final Project – E-Learning Course Management API

A RESTful API built with Node.js, Express, and MongoDB for managing courses, users, enrollments, and student progress. The application includes OAuth authentication, JWT-based authorization, Swagger documentation, and automated tests with Jest.

---

## 🚀 Technologies Used

- Node.js + Express
- MongoDB Atlas
- Mongoose
- Swagger (OpenAPI)
- JWT (jsonwebtoken)
- Google OAuth 2.0
- Joi (data validation)
- Redis (session management)
- Jest + Supertest (unit testing)
- Render (deployment)

---

## 📁 Project Structure

```
.
├── controllers/
├── routes/
├── services/
├── models/
├── config/
├── middleware/
├── helper/
├── tests/
├── swagger.json
├── server.js
└── .env
```

---

## ⚙️ How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/your-username/cse341-final-project.git
cd cse341-final-project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following:

```env
PORT=8080
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/elearning?retryWrites=true&w=majority
JWT_SECRET=devjwt123

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback
```

4. Start the development server:
```bash
npm start
```

---

## 📄 Swagger API Documentation

Once the server is running locally:
```
http://localhost:8080/api-docs
```

Deployed on Render:
```
https://cse341-final-project-r9c4.onrender.com/api-docs
```

---

## 🧪 Running Automated Tests

### ✅ Prerequisites:

- Create a separate test database in MongoDB Atlas called `elearning_test`.
- Add a `.env.test` file in the root directory:

```env
MONGO_URI_TEST=mongodb+srv://<user>:<password>@cluster.mongodb.net/elearning_test?retryWrites=true&w=majority
JWT_SECRET=devjwt123
BEARER_TOKEN=Bearer <valid_jwt_token_with_role_instructor>
```

> ⚠️ Make sure your token includes role `instructor` or tests for protected routes may fail with 403.

---

### ▶️ Run the tests:

```bash
npm run test
```

Tests use Jest and Supertest to validate `GET` endpoints for the `users`, `courses`, `enrollments`, and `progress` collections.

---

## 🔐 Security

- Google OAuth login
- Role-based access control (`student`, `instructor`)
- Protected routes for `POST` and `PUT`
- JWT with signature validation
- Redis session support

---

## 📦 Deployment

Project deployed on:
- Render: https://cse341-final-project-r9c4.onrender.com
- Swagger: https://cse341-final-project-r9c4.onrender.com/api-docs

---

## 🧠 Academic Project

This project was developed as part of the **CSE 341 – Web Backend Development** course at **BYU-Idaho**, in collaboration with a team.