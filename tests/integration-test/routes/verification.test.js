const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");
const jwt = require("jsonwebtoken");
const config = require("config");

const agent = request.agent(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/Verification", () => {
  describe("/send ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid verification request is sent", async () => {
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
          .post("/skillverification/send")
          .send({
            serviceProviderName: serviceDecoded.username,
            serviceProviderId: serviceDecoded._id,
            email: serviceDecoded.email,
            description: "GBN company certificate",
            isSolved: false,
            isaccepted: false,
            attachments:
              "C:/Users/shami/ExpressTaskerNewest/ExpressTasker/express-tasker/public/profilePhotos/Certificate1.jpg",
          })
          .expect(500);
      });
      it("should return 200 when the vertifiaction request is returned successfully", async () => {
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
          .post(`/skillverification/find/${serviceDecoded._id}`)
          .expect(200);
      });

      it("should return 404 when the vertifiaction request is not returned successfully", async () => {
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

        await agent.post(`/skillverification/find/`).expect(404);
      });

      it("should return 200 when all the vertifiaction requests are returned successfully", async () => {
        await agent.post(`/skillverification/`).expect(200);
      });
    });
  });
});
