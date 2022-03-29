import UserRepo from "../../../repositories/user.repo";
import CreateUserUseCase from "../create/useCase";
import LogoutUserUseCase from "../logout/useCase";
import LoginUseCase from "../login/useCase";
import GetUserByToken from "./useCase";
import mongoose from "mongoose";

const username = 'avvv';
const password = '123456789';
const userForTest = { username:username, password:password };
const token = new GetUserByToken();
const newUser = new CreateUserUseCase();
const createdUser = new LoginUseCase();
const user = new UserRepo();
var createdToken:string;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  await newUser.create(userForTest);
  const data = await createdUser.login(username, password);
  createdToken = data.token;
});


afterAll(async () => {
  await user.deleteByUsername(username);
  await mongoose.disconnect();
});


test("Test: Get user by token", async () => {
  const userFound = await token.get(createdToken);
  expect(userFound.username).toBe(username);
});

describe("Test errors when get token", () => {

  test("Test: Don't send token", async () => {
    try {
      await token.get(createdToken);
    }
    catch(err:any) {
      const emptyToken = "Empty token";
      expect(err.message).toBe(emptyToken);
      expect(err.status).toBe(401);
    }
  });


  test("Test: Send invalid token", async () => {
    try {
      await token.get('assafsafasfa');
    }
    catch(err:any) {
      const invalidToken = 'Token invalid or expired';
      expect(err.message).toBe(invalidToken);
      expect(err.status).toBe(401);
    }
  });


  test("Test: Send token of user that logout", async () => {
    try {
      const loggedUser = new LogoutUserUseCase();
      const userToLogout = await user.findByUsername(username);
      await loggedUser.logout(userToLogout);
      await token.get(createdToken);
    }
    catch(err:any) {
      const invalidToken = 'Expired token';
      expect(err.message).toBe(invalidToken);
      expect(err.status).toBe(401);
    }
  });
});