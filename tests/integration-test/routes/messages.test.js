const { iteratee } = require("lodash");
const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/messages", () => {
  describe("/", () => {
    describe("POST /", () => {
      it("should return 200 when a message is created", async () => {
        await agent
          .post("/messages/")
          .send({
            conversationId: "615851b29a3e27774518d508",
            sender: "615553d90a747fa4aed3d402",
            text: "Hi",
          })
          .expect(200);
      });
    });
  });
  describe("/:conversationId", () => {
    describe("POST /", () => {
      it("should return messages specific to conversation", async () => {
        await agent.post("/messages/").send({
          conversationId: "615851b29a3e27774518d508",
          sender: "615553d90a747fa4aed3d402",
          text: "Hi",
        });
        await agent
          .post("/messages/615851b29a3e27774518d508")
          .send({})
          .expect(200);
      });
    });
  });
});
