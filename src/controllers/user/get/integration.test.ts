import UserRepo from "../../../repositories/user.repo";
import routes from "../../../../routes";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import express from 'express';
import req from 'supertest';

const userForTest = { username:'aacxc', password:'123456789' };
const user = new UserRepo();
const app = express();
var token:string;

app.use(bodyParser.json());
app.use(routes);

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  await req(app).post("/user").send(userForTest);
  token = (await req(app).post("/user/login").send(userForTest)).body.token;  
});


afterAll(async () => {
  await user.deleteByUsername(userForTest.username);
  await mongoose.disconnect();
});


test("Test: Get user data", async () => {
  const res = await req(app).get("/user").set("Authorization", token);
  expect(res.status).toBe(200);
  expect(res.body.username).toBe(userForTest.username);
  expect(res.body.tasks.length).toBe(0);
});