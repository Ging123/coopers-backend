import UserRepo from "../../../repositories/user.repo";
import routes from "../../../../routes";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import express from 'express';
import req from 'supertest';

const userForTest = { username:'billy', password:'123456789' };
const user = new UserRepo();
const app = express();

app.use(bodyParser.json());
app.use(routes);

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  await req(app).post("/user").send(userForTest);
});


afterAll(async () => {
  await user.deleteByUsername(userForTest.username);
  await mongoose.disconnect();
});


test('Test: Login an user', async () => {
  const data = {
    username:userForTest.username,
    password:userForTest.password
  }
  const res = await req(app).post('/user/login').send(data);
  expect(res.status).toBe(201);
  expect(res.body.username).toBe(userForTest.username);
  expect(res.body.tasks.length).toBe(0);
  expect(res.body.token).toBeTruthy();
});


describe('Test username and password errors', () => {

  test("Test: Username doesn't exists", async () => {
    const data = {
      username:'aa',
      password:'123456789'
    }
    const usernameWasDoesntExists = "This user doesn't exists";
    const res = await req(app).post('/user/login').send(data);
    expect(res.status).toBe(400);
    expect(res.body).toBe(usernameWasDoesntExists);
  });


  test("Test: password was typed wrong", async () => {
    const data = {
      username:userForTest.username,
      password:'12345678229'
    }
    const wrongPassword = "Password is wrong";
    const res = await req(app).post('/user/login').send(data);
    expect(res.status).toBe(400);
    expect(res.body).toBe(wrongPassword);
  });
})