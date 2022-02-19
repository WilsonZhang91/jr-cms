const supertest = require("supertest");
const app = require("../../../src/app");
const mongoose = require("mongoose");
const Student = require("../../../src/models/student");

const request = supertest(app);

describe("/students", () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("Create", () => {
    it("should save the student if request is valid", async () => {
      const body = {
        firstName: "xxx",
        lastName: "yyy",
        email: "xxx@mmm.com",
      };
      const response = await request.post("/v1/students").send(body);
      expect(response.statusCode).toBe(201);
      const student = await Student.findOne(body).exec();
      expect(student).toBeTruthy();
    });
  });
});
