import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/server";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe("Auth API", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({name: "Ahmed", email: "ahmed@test.com", password: "12345678", role: "student" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
  });

  it("should login a user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ name: "Ahmed", email: "login@test.com", password: "12345678", role: "student" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@test.com", password: "12345678" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
