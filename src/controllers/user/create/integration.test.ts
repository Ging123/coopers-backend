import UserRepo from "../../../repositories/user.repo";
import routes from "../../../../routes";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import express from 'express';
import req from 'supertest';

const userForTest = { username:'jack', password:'123456789' };
const user = new UserRepo();
const app = express();

app.use(bodyParser.json());
app.use(routes);


beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
});


afterAll(async () => {
  await user.deleteByUsername(userForTest.username);
  await mongoose.disconnect();
});


test('Test: Create user', async () => {
  const res = await req(app).post('/user').send(userForTest);
  expect(res.status).toBe(201);
});


describe("Test username errors", () => {
  
  test("Test: Empty username", async () => {
    const data = { password:'123456789' };
    const isEmpty = 'Empty username';
    const res = await req(app).post('/user').send(data);
    expect(res.body).toBe(isEmpty);
  });


  test("Test: Length greater than allowed", async () => {
    const data = {
      username:'safosakf2k0fk20kfokfosakfoaskfas02k02kfoakfosakokaofkaksoakdoaksokdokasokdokasokd', 
      password:'123456789' 
    }
    const lengthGreaterThanAllowed = 'Username must have less than 30 characteres';
    const res = await req(app).post('/user').send(data);
    expect(res.status).toBe(400);
    expect(res.body).toBe(lengthGreaterThanAllowed);
  });


  test("Test: Username already exists", async () => {
    const res = await req(app).post('/user').send(userForTest);
    const usernameAlreadyExists = 'This username is already being used';
    expect(res.status).toBe(400);
    expect(res.body).toBe(usernameAlreadyExists);
  });
});


describe("Test password errors", () => {

  test("Test: Empty password", async () => {
    const data = { username:"aaaa" };
    const res = await req(app).post('/user').send(data);
    const emptyPassword = 'Empty password';
    expect(res.status).toBe(400);
    expect(res.body).toBe(emptyPassword);
  });


  test("Test: Length greater than allowed", async () => {
    const data = { 
      username:"aaaa",
      password:"askodkasodksaokdosafosajfoasfoajsofjasofkfk102f120fk012f921kf921kf1"
    };
    const res = await req(app).post('/user').send(data);
    const greaterThanAllowed = 'Password must have less than 30 characteres';
    expect(res.status).toBe(400);
    expect(res.body).toBe(greaterThanAllowed);
  });


  test("Test: Length shorter than allowed", async () => {
    const data = { 
      username:"aaaa",
      password:"a"
    };
    const res = await req(app).post('/user').send(data);
    const shorterThanAllowed = 'Password must have atleast 7 characteres';
    expect(res.status).toBe(400);
    expect(res.body).toBe(shorterThanAllowed);
  });
});