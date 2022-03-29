import UserRepo from "../../../repositories/user.repo";
import routes from "../../../../routes";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import express from "express";
import req from 'supertest';

const userRepo = new UserRepo();
const userForTest = { username:"safafafghh", password:"123456789" };
const app = express();
var token:string;

app.use(bodyParse.json());
app.use(routes)

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  await req(app).post("/user").send(userForTest);
  token = (await req(app).post("/user/login").send(userForTest)).body.token;
});


afterAll(async () => {
  await userRepo.deleteByUsername(userForTest.username);
  await mongoose.disconnect();
});


test("Test: Delete all tasks", async () => {
  const res = await req(app)
    .delete("/task/")
    .set("Authorization", token)
  expect(res.status).toBe(204);
});