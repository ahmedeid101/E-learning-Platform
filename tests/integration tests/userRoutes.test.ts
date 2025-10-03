// import mongoose, { Types } from "mongoose";
// import supertest from "supertest";
// import { MongoMemoryServer } from "mongodb-memory-server";
// import app from "../../src/server";
// import  { User } from "../../src/models/User";
// import {IUser} from "../../src/types/user.type"

// const request = supertest(app);

// // Define a UserDocument type that merges IUser with Mongoose Document
// type UserDocument = Document & IUser & { _id: Types.ObjectId };

// let mongoServer: MongoMemoryServer;
// let userId: string;
// let token: string;
// let adminToken: string;
// let user: UserDocument;

// beforeAll(async () => {
//   // Start in-memory Mongo
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   await mongoose.disconnect();
//   await mongoose.connect(uri);

//   // Create a normal user
//    const createdUser = await User.create({
//       name: "Test User",
//       email: "testuser@example.com",
//       password: "password123",
//       role: "student",
//   });
//   //
//   userId = user._id.toString();
  

//    // Create an admin user
//   await User.create({
//     name: "Admin User",
//     email: "admin@example.com",
//     password: "password123",
//     role: "admin",
//   });

//   // Login both to get tokens
//   const userLogin = await request
//     .post("/api/auth/login")
//     .send({ email: "user@example.com", password: "password123" });
//   token = userLogin.body.token;

//   const adminLogin = await request
//     .post("/api/auth/login")
//     .send({ email: "admin@example.com", password: "password123" });
//   adminToken = adminLogin.body.token;

// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// });

// describe("User Routes", () => {
//   it("should get user profile", async () => {
//     const res = await request
//       .get(`/api/users/profile/${userId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.status).toBe(200);
//     expect(res.body.email).toBe("user@test.com");
//   });

//   it("should update user profile", async () => {
//     const res = await request
//       .put(`/api/users/profile/${userId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ name: "Updated Name" });

//     expect(res.status).toBe(200);
//     expect(res.body.name).toBe("Updated Name");
//   });

//   it("should get all users (admin only)", async () => {
//     // create admin user
//     const adminRes = await request
//       .post("/api/auth/register")
//       .send({ email: "admin@test.com", password: "12345678", role: "admin" });

//     const loginAdmin = await request
//       .post("/api/auth/login")
//       .send({ email: "admin@test.com", password: "12345678" });

//     const adminToken = loginAdmin.body.token;

//     const res = await request
//       .get("/api/users/profiles")
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.status).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it("should delete user profile", async () => {
//     const res = await request
//       .delete(`/api/users/profile/${userId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.status).toBe(200);
//   });
// });
