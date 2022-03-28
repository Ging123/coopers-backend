import TaskRepo from "../../../repositories/task.repo";
import UserRepo from "../../../repositories/user.repo";
import routes from "../../../../routes";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import express from 'express';
import req from 'supertest';

const userForTest = { username:'asasdf', password:'123456789' };
const task = new TaskRepo();
const user = new UserRepo();
const app = express();
var token:string;

app.use(bodyParser.json());
app.use(routes);

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  await req(app).post("/user").send(userForTest);
  const res = await req(app).post("/user/login").send(userForTest);
  token = res.body.token;
});


afterAll(async () => {
  await task.deleteByOwner(userForTest.username);
  await user.deleteByUsername(userForTest.username);
  await mongoose.disconnect();
});


test("Test: logout user", async () => {
  const res = await req(app).delete("/user/logout").set("Authorization", token);
  expect(res.status).toBe(204);
});