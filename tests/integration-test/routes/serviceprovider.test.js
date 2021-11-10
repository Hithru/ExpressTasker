const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");

const agent = request.agent(app);
console.log(agent);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/ServiceProvider", () => {
  describe("/signup ", () => {
    describe("/ POST", () => {
      it("should return 200 when service provider signup Correctly", async () => {
        await agent
          .post("/serviceProvider/signup")
          .send({
            username: "shamila Nuwan",
            skills: [],
            location: "Ampara",
            description: "I am an very good seller",
            review: "No reviews",
            rating: 0,
            contactNumber: "0716452576",
            merchantId: "",
            profilePicture: "no picture",
            email: "shamila@gmail.com",
            password: "123456",
            isVerified: false,
          })
          .expect(200);
      });

    //   it("should return 400 when validation error happen", async () => {
    //     await agent
    //       .post("/serviceProvider/signup")
    //       .send({
    //         username: "shamila Nuwan",
    //         skills: [],
    //         location: "Ampara",
    //         description: "I am an very good seller",
    //         review: "No reviews",
    //         rating: 0,
    //         contactNumber: "0716452576",
    //         merchantId: "",
    //         profilePicture: "no picture",
    //         email: "shamila@gmail.com",
    //         password: "123456",
    //         isVerified: false,
    //       })
    //       .expect(400);
    //   });
    });
  });
});
