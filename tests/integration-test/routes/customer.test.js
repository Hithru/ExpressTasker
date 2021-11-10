const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");
const jwt = require("jsonwebtoken");
const config = require("config");

// Pass supertest agent for each test
const agent = request.agent(app);
console.log(agent);
// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/Customer", () => {
  describe("/signup ", () => {
    describe("/ POST", () => {
      it("should return 200 when customer signup Correctly", async () => {
        await agent
          .post("/customer/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
            location: "Ampara",
          })
          .expect(200);
      });

      it("should return 400 when validation error happen", async () => {
        await agent
          .post("/customer/signup")
          .send({
            username: "Hit",
            email: "hithrualwis@gmail.com",
            password: "123456",
            location: "Ampara",
          })
          .expect(400);
      });

      it("should return 400 when user already registerd", async () => {
        await agent.post("/customer/signup").send({
          username: "Hithru",
          email: "hithrualwis@gmail.com",
          password: "123456",
          location: "Ampara",
        });

        await agent
          .post("/customer/signup")
          .send({
            username: "Hithru",
            email: "hithrualwis@gmail.com",
            password: "123456",
            location: "Ampara",
          })
          .expect(400);
      });

      it("should return 200 when the customer detail is returned successfully", async () => {
        let token;
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

            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const customerDecoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
        .post(`/customer/${customerDecoded._id}`)
        .expect(200);

    });


    });
  });
});
