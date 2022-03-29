import UserRepo from "../../../repositories/user.repo";
import routes from "../../../../routes";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import express from "express";
import req from 'supertest';

const userRepo = new UserRepo();
const userForTest = { username:"kaksdqwb", password:"123456789" };
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


test("Test: Create task", async () => {
  const res = await req(app)
    .post("/task")
    .set("Authorization", token)
    .send({ text:"Write tests", listName:"do" });
  expect(res.status).toBe(201);
});


describe("Test errors in text", () => {

  test("Test: Don't send text", async () => {
    const emptyText = "Empty text";
    const res = await req(app)
      .post("/task")
      .set("Authorization", token)
      .send({listName:"do"});
    expect(res.status).toBe(400);
    expect(res.body).toBe(emptyText);
  });


  test("Test: Text greater than 300", async () => {
    const lengthGreaterThanAllowed = "Text must be less than 300 in length";
    const res = await req(app)
      .post("/task")
      .set("Authorization", token)
      .send({listName:"done", text:"dsfsdfsdfsdsdsdfsdsd plfasko fksaokf osakofksaofksaokfsaokfoaskfoaskfosksalfksalfkaslfksalkflaskflaskflsakflasflasfmasfmsaifiasfasfasfiasjfiasjifjaisjfiasjfiasjfiasjifjasifjiasjfiasjfijasifaskjfsa jfkasjk fjask jfk jsa kfjask fjkas jfkasjfkjaskfjaskjfkasjkf jsafkjskajf21-210ie0-12912391dk91kd 9k19dk 921k 9dk219dk 921k9dk12 9dk12odk21odk21ldkl12 kldk21l dkl21k lkdl k21lkd lk12l kdl1k l2k dl21k ldk1l dk2l1kdl 2k 1ldk12l dkl12kd21kdo21di210d9 012 9d021d-020kd21 k0d k21k do12kdo12 dk 2k1od12,do12" });
    expect(res.status).toBe(400);
    expect(res.body).toBe(lengthGreaterThanAllowed);
  });
});


describe("Test list name errors", () => {
  
  test("Test: Don't send list name", async () => {
    const emptyListName = "Empty list name";
    const res = await req(app)
      .post("/task")
      .set("Authorization", token)
      .send({text:"Go to school"});
    expect(res.status).toBe(400);
    expect(res.body).toBe(emptyListName);
  });


  test("Test: Send list name with length greater than allowed", async () => {
    const lengthGreaterThanAllowed = "List name must be less than 30 in length";
    const res = await req(app)
      .post("/task")
      .set("Authorization", token)
      .send({text:"Create function" ,listName:"dsfsdfsdfsdsdsdfsdsd plfasko fksaokf osakofksaofksaokfsaokfoaskfoaskfosksalfksalfkaslfksalkflaskflaskflsakflasflasfmasfmsaifiasfasfasfiasjfiasjifjaisjfiasjfiasjfiasjifjasifjiasjfiasjfijasifaskjfsa jfkasjk fjask jfk jsa kfjask fjkas jfkasjfkjaskfjaskjfkasjkf jsafkjskajf21-210ie0-12912391dk91kd 9k19dk 921k 9dk219dk 921k9dk12 9dk12odk21odk21ldkl12 kldk21l dkl21k lkdl k21lkd lk12l kdl1k l2k dl21k ldk1l dk2l1kdl 2k 1ldk12l dkl12kd21kdo21di210d9 012 9d021d-020kd21 k0d k21k do12kdo12 dk 2k1od12,do12" });
    expect(res.status).toBe(400);
    expect(res.body).toBe(lengthGreaterThanAllowed);
  });
});