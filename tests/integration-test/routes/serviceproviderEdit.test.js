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


describe("/ServiceproviderEdit", () => {
    describe("/edit ", () => {
      describe("/ POST", () => {
        it("should return 200 when service provider profile edit with valid data", async () => {
    
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
              .post(`/serviceProvider/edit/${serviceDecoded._id}`)
              .send({
                username: "shamila de silva",
                skills: [],
                location: "Galle",
                description: "I am an very good seller and businessmon",
                review: "No reviews",
                rating: 0,
                contactNumber: "0918678172",
                merchantId: "",
                profilePicture: "no picture",
                email: "shamiladesilva@gmail.com",
                password: "123456789",
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

          

        
     
      });
    });
  });
  