require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Progress = require("../models/Progress");

// MOCK THE REDIS + JWT
jest.mock("../config/redisClient", () => ({
  connect: jest.fn(),
  on: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  quit: jest.fn(),
}));

// Connect and seed before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // Seed with a test progress entry
  await Progress.create({
    studentId: "67f679290652a8d1d05c9229",
    courseId: "67f443850e7dbb18d75d60cb",
    progressValue: 45,
  });
});

describe("Progress Routes", () => {
  const token = process.env.BEARER_TOKEN;
  it("should get all student progress entries", async () => {
    const res = await request(app).get("/api/progress").set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});
