const { iteratee } = require("lodash");
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

describe("/conversations", () => {
  describe("/", () => {
    describe("POST /", () => {
      it("should return 200 when a conversation is created", async () => {
        await agent
          .post("/conversations/")
          .send({
            members: ["615553d90a747fa4aed3d402", "61555c02ec9d5b6b988c2e8b"],
          })
          .expect(200);
      });
    });
  });
  describe("/:userId", () => {
    describe("POST /", () => {
      it("should return conversations specific to a user", async () => {
        await agent.post("/conversations/").send({
          members: ["615553d90a747fa4aed3d402", "61555c02ec9d5b6b988c2e8b"],
        });
        await agent.post("/conversations/615553d90a747fa4aed3d402").expect(200);
      });
    });
  });
  describe("/:userId/:receiverId", () => {
    describe("POST /", () => {
      it("should return the conversation specific both customer and service provider", async () => {
        await agent.post("/conversations/").send({
          members: ["615553d90a747fa4aed3d402", "61555c02ec9d5b6b988c2e8b"],
        });
        await agent
          .post(
            "/conversations/isThereConversation/615553d90a747fa4aed3d402/61555c02ec9d5b6b988c2e8b/"
          )
          .send({})
          .expect(200);
      });
    });
  });
});
