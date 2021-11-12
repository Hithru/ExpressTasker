const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");
const jwt = require("jsonwebtoken");
const config = require("config");
// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => {
  await db.clear();
});
afterAll(async () => await db.close());

describe("/Review", () => {
  describe("/createReview ", () => {
    describe("/ POST", () => {
      //No Token
      it("should return 401 when token is not set", async () => {
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

        let orderData;
        await agent
          .post("/order/createOrder")
          .send({
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            amount: 10000,
            description: "Need help with plumbing work",
            status: "Finished",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/review/createReview")
          .send({
            order_id: orderData._id,
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            rating: 5,
            review: "Very Good Seller",
          })
          .expect(401);
      });

      //Service Provider Token

      it("should return 403 when wrong token set", async () => {
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

        let orderData;
        await agent
          .post("/order/createOrder")
          .send({
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            amount: 10000,
            description: "Need help with plumbing work",
            status: "Finished",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/review/createReview")
          .send({
            order_id: orderData._id,
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            rating: 5,
            review: "Very Good Seller",
          })
          .set("x-auth-token", serviceToken)
          .expect(403);
      });

      //Bad Token

      it("should return 400 when invalid token set", async () => {
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

        let orderData;
        await agent
          .post("/order/createOrder")
          .send({
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            amount: 10000,
            description: "Need help with plumbing work",
            status: "Finished",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/review/createReview")
          .send({
            order_id: orderData._id,
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            rating: 5,
            review: "Very Good Seller",
          })
          .set("x-auth-token", {})
          .expect(400);
      });

      //Correct Data
      it("should return 200 when valid data to review send with token set", async () => {
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

        let orderData;
        await agent
          .post("/order/createOrder")
          .send({
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            amount: 10000,
            description: "Need help with plumbing work",
            status: "Finished",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/review/createReview")
          .send({
            order_id: orderData._id,
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            rating: 5,
            review: "Very Good Seller",
          })
          .set("x-auth-token", token)
          .expect(200);
      });

      //Wrong Data
      it("should return 400 when Invalid data send ", async () => {
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

        let orderData;
        await agent
          .post("/order/createOrder")
          .send({
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            amount: 10000,
            description: "Need help with plumbing work",
            status: "Finished",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/review/createReview")
          .send({
            order_id: orderData._id,
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            rating: "No Rating",
            review: "Very Good Seller",
          })
          .set("x-auth-token", token)
          .expect(400);
      });
    });
  });
});
