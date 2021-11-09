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

describe("/Order", () => {
  describe("/customer ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid customer id send with token set", async () => {
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
          .post("/order/customer")
          .send({ customer_id: decoded._id })
          .set("x-auth-token", token)
          .expect(200);
      });
    });
  });
});
