require("dotenv").config({ path: ".env.test" });
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

// MOCK THE REDIS + JWT
jest.mock("../config/redisClient", () => ({
  connect: jest.fn(),
  on: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  quit: jest.fn(),
}));

// jest.setTimeout(20000);

// Connect and seed before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "wonder123",
    role: "instructor",
  });
});

describe("User Routes", () => {
  const token = process.env.BEARER_TOKEN;
  it("should get all users", async () => {
    const res = await request(app).get("/api/users").set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a user by ID", async () => {
    const newUser = await User.create({
      name: "Test User",
      email: "test3@example.com",
      password: "wonder123",
      role: "instructor",
    });

    const res = await request(app).get(`/api/users/${newUser._id}`).set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("test3@example.com");
  });
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});
