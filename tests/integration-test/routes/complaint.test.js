const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");
const jwt = require("jsonwebtoken");
const config = require("config");
const agent = request.agent(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());


describe("/Complaint", () => {
    describe("/createComplaint ", () => {
      describe("/ POST", () => {
        it("should return 200 when valid complaint created with valid data", async () => {
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
                // Save the cookie to use it later to retrieve the session
    
                serviceToken = res.header["x-auth-token"];
                expect(res.header).toHaveProperty("x-auth-token");
              });
    
            const serviceDecoded = jwt.verify(
              serviceToken,
              config.get("jwtPrivateKey")
            );
    
            await agent
              .post("/serviceProvider/createComplaint")
              .send({
                serviceProvider_id: serviceDecoded._id,
                serviceProvider_name: serviceDecoded.username,
                serviceProvider_email: serviceDecoded.email,
                description: "Not gave enough money",
                isSolved: false,
              })
              .set("x-auth-token", token)
              .expect(200);

              await agent
              .post("/customer/createComplaint")
              .send({
                customer_id: customerDecoded._id,
                customer_name: customerDecoded.username,
                customer_email: customerDecoded.email,
                description: "Job is not done correctly",
                isSolved: false,
              })
              .set("x-auth-token", token)
              .expect(200);

          });
     
      });
    });
  });
  