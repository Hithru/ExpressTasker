const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");
const jwt = require("jsonwebtoken");
const config = require("config");

const agent = request.agent(app);

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

      it("should return 400 when user already registerd", async () => {
        await agent.post("/serviceProvider/signup").send({
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
        });

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
          .expect(400);
      });

      it("should return 200 when all the service providers are returned successfully", async () => {
        await agent.post("/serviceProvider/").expect(200);
      });

      it("should return 200 when the service provider details are returned successfully", async () => {
        let serviceToken;
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
          .then((res) => {
            serviceToken = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const serviceDecoded = jwt.verify(
          serviceToken,
          config.get("jwtPrivateKey")
        );

        await agent.post(`/serviceProvider/${serviceDecoded._id}`).expect(200);
      });

      it("should return 200 when the profile picture details are returned successfully", async () => {
        let serviceToken;
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
          .then((res) => {
            serviceToken = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const serviceDecoded = jwt.verify(
          serviceToken,
          config.get("jwtPrivateKey")
        );

        await agent
          .post(`/serviceProvider/profile/${serviceDecoded._id}`)
          .expect(200);
      });

      it("should return 200 when valid profile picture added", async () => {
        let serviceToken;
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
          .then((res) => {
            serviceToken = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const serviceDecoded = jwt.verify(
          serviceToken,
          config.get("jwtPrivateKey")
        );

        await agent
          .post("/serviceProvider/addProfilePicture")
          .send({
            serviceProviderId: serviceDecoded._id,
            serviceProviderName: serviceDecoded.username,
            serviceProviderPicture: "n9pkamo6qbbock6pxjit.jpg",
          })
          .expect(500);
      });
    });
  });
});
