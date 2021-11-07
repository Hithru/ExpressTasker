const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");

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
        agent
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
        agent
          .post("/customer/signup")
          .send({
            username: "Hit",
            email: "hithrualwis@gmail.com",
            password: "123456",
            location: "Ampara",
          })
          .expect(400);
      });
    });
  });
});