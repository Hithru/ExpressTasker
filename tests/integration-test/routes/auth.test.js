const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");
const jwt = require("jsonwebtoken");
const config = require("config");
// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/Auth", () => {
  describe("/customer ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid login data send", async () => {
        let token;
        let data;
        await agent
          .post("/customer/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
            location: "Ampara",
          })
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/auth/customer")
          .send({ email: "hithrualwis@gmail.com", password: "123456" })
          .expect(200);
      });

      it("should return 400 when unvalid format data send", async () => {
        let token;
        let data;
        await agent
          .post("/customer/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
            location: "Ampara",
          })
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/auth/customer")
          .send({ email: "hithrualwis", password: "123456" })
          .expect(400);
      });

      it("should return 400 when email send that not in database sent", async () => {
        let token;
        let data;
        await agent
          .post("/customer/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
            location: "Ampara",
          })
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/auth/customer")
          .send({ email: "hithru@gmail.com", password: "123456" })
          .expect(400);
      });

      it("should return 400 when wrong password set", async () => {
        let token;
        let data;
        await agent
          .post("/customer/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
            location: "Ampara",
          })
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/auth/customer")
          .send({ email: "hithrualwis@gmail.com", password: "1234567" })
          .expect(400);
      });
    });
  });

  describe("/ServiceProvider ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid login data send", async () => {
        let token;
        let data;
        await agent
          .post("/serviceProvider/signup")
          .send({
            username: "Hithru De Alwis",
            skills: [],
            location: "Ampara",
            description: "I am an very good seller",
            review: "No reviews",
            rating: 0,
            contactNumber: "0716452576",
            merchantId: "",
            profilePicture: "no picture",
            email: "hithrualwis@gmail.com",
            password: "123456",
            isVerified: false,
          })
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/auth/serviceProvider")
          .send({ email: "hithrualwis@gmail.com", password: "123456" })
          .expect(200);
      });

      it("should return 400 when unvalid format data send", async () => {
        let token;
        let data;
        await agent
          .post("/serviceProvider/signup")
          .send({
            username: "Hithru De Alwis",
            skills: [],
            location: "Ampara",
            description: "I am an very good seller",
            review: "No reviews",
            rating: 0,
            contactNumber: "0716452576",
            merchantId: "",
            profilePicture: "no picture",
            email: "hithrualwis@gmail.com",
            password: "123456",
            isVerified: false,
          })
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/auth/serviceProvider")
          .send({ email: "hithrualwis", password: "123456" })
          .expect(400);
      });

      it("should return 400 when email send that not in database sent", async () => {
        let token;
        let data;
        await agent
          .post("/serviceProvider/signup")
          .send({
            username: "Hithru De Alwis",
            skills: [],
            location: "Ampara",
            description: "I am an very good seller",
            review: "No reviews",
            rating: 0,
            contactNumber: "0716452576",
            merchantId: "",
            profilePicture: "no picture",
            email: "hithrualwis@gmail.com",
            password: "123456",
            isVerified: false,
          })
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/auth/serviceProvider")
          .send({ email: "hithru@gmail.com", password: "123456" })
          .expect(400);
      });

      it("should return 400 when wrong password set", async () => {
        let token;
        let data;
        await agent
          .post("/serviceProvider/signup")
          .send({
            username: "Hithru De Alwis",
            skills: [],
            location: "Ampara",
            description: "I am an very good seller",
            review: "No reviews",
            rating: 0,
            contactNumber: "0716452576",
            merchantId: "",
            profilePicture: "no picture",
            email: "hithrualwis@gmail.com",
            password: "123456",
            isVerified: false,
          })
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/auth/serviceProvider")
          .send({ email: "hithrualwis@gmail.com", password: "1234567" })
          .expect(400);
      });
    });
  });
});
