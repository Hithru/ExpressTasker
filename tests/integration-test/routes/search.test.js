const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/search", () => {
  describe("/service-provider", () => {
    describe("POST /", () => {
      it("should return service provider object relevant to service provider", async () => {
        await agent.post("/serviceProvider/sig").send({
          username: "Teflon International",
          skills: ["Home Improvement", "Cleaning Service"],
          location: "Colombo",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie vulputate lorem, sed hendrerit risus pharetra id. Quisque eget nisi nisl. Etiam egestas est mollis turpis dignissim, at pulvinar purus volutpat. Integer urna purus, ullamcorper quis mollis ut, maximus et libero. Morbi sit amet tortor lorem. Curabitur dignissim, risus non luctus faucibus, purus ipsum malesuada leo, at molestie turpis ex ac justo. Curabitur eget felis nec metus scelerisque dictum. Nullam dolor arcu, efficitur quis lorem eu, mollis consectetur sapien. Donec rhoncus mi et condimentum laoreet.",
          review: "No reviews",
          rating: 4.5,
          contactNumber: 94774973999,
          profilePicture: "no picture",
          email: "wagnerint@gmail.com",
          password:
            "$2b$10$PqcJBDUjyjTWIC80YoRVjeMe0VWTmWCDViNY3llwt5Ltj4bHm2sHa",
          isVerified: false,
        });
        await agent
          .post("/search/service-provider")
          .send({
            service_provider: "Teflon",
          })
          .expect(200);
      });
    });
  });
  describe("/service", () => {
    describe("POST /", () => {
      it("should return service provider object relevant to search term", async () => {
        await agent.post("/serviceProvider/signup").send({
          username: "Teflon International",
          skills: ["Home Improvement", "Cleaning Service"],
          location: "Colombo",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie vulputate lorem, sed hendrerit risus pharetra id. Quisque eget nisi nisl. Etiam egestas est mollis turpis dignissim, at pulvinar purus volutpat. Integer urna purus, ullamcorper quis mollis ut, maximus et libero. Morbi sit amet tortor lorem. Curabitur dignissim, risus non luctus faucibus, purus ipsum malesuada leo, at molestie turpis ex ac justo. Curabitur eget felis nec metus scelerisque dictum. Nullam dolor arcu, efficitur quis lorem eu, mollis consectetur sapien. Donec rhoncus mi et condimentum laoreet.",
          review: "No reviews",
          rating: 4.5,
          contactNumber: 94774973999,
          profilePicture: "no picture",
          email: "wagnerint@gmail.com",
          password:
            "$2b$10$PqcJBDUjyjTWIC80YoRVjeMe0VWTmWCDViNY3llwt5Ltj4bHm2sHa",
          isVerified: false,
        });
        await agent
          .post("/search/service")
          .send({
            service: "home",
            location: "Colombo",
          })
          .expect(200);
      });
    });
  });
});
