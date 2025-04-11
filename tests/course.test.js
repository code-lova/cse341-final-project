require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Course = require("../models/Courses");

// MOCK THE REDIS + JWT
jest.mock("../config/redisClient", () => ({
  connect: jest.fn(),
  on: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  quit: jest.fn(),
}));

//jest.setTimeout(20000);

// Connect and seed before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // Seed with a test course
  await Course.create({
    title: "Test Course CS101",
    description: "Test Description",
    instructor: "67d955d87203c86c07e8427b",
    duration: "1 Month",
    amount: 0,
    courseType: "free",
  });
});

describe("Course Routes", () => {
  const token = process.env.BEARER_TOKEN;
  it("should get all courses", async () => {
    const res = await request(app).get("/api/courses").set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a course by ID", async () => {
    const course = await Course.create({
      title: "Test Course 2",
      description: "Test Description 2",
      instructor: "67d955d87203c86c07e8427b",
      duration: "3 Month",
      amount: 0,
      courseType: "free",
    });

    const res = await request(app).get(`/api/courses/${course._id}`).set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", course._id.toString());
  });
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});
