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

describe("/Order", () => {
  describe("/createOrder ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid order created with valid data", async () => {
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
          .expect(200);
      });

      it("should return 400 when invalid data send", async () => {
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
          .post("/order/createOrder")
          .send({
            customer_id: customerDecoded._id,
            customer_name: customerDecoded.username,
            serviceProvider_id: serviceDecoded._id,
            serviceProvider_name: serviceDecoded.username,
            amount: "four thousand",
            description: "Need help with plumbing work",
            status: "Finished",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .expect(400);
      });
    });
  });

  describe("/customer ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid customer id send with token set", async () => {
        let token;
        let data;
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
            data = res;
            token = res.header["x-auth-token"];
            expect(res.header).toHaveProperty("x-auth-token");
          });

        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        await agent
          .post("/order/customer")
          .send({ customer_id: decoded._id })
          .set("x-auth-token", token)
          .expect(200);
      });
    });
  });

  describe("/details ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid order id send", async () => {
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
          .post("/order/details")
          .send({ order_id: orderData._id })
          .set("x-auth-token", token)
          .expect(200);
      });
    });
  });

  describe("/ServiceProvider ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid serviceProvider id send with token set", async () => {
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
          .post("/order/serviceProvider")
          .send({ serviceProvider_id: serviceDecoded._id })
          .set("x-auth-token", serviceToken)
          .expect(200);
      });
    });
  });

  describe("/Cancel ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid order id send ", async () => {
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
            status: "Pending",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/order/cancel")
          .send({ order_id: orderData._id })
          .expect(200);
      });

      it("should return 404 when order with given id didn't exist ", async () => {
        await agent
          .post("/order/cancel")
          .send({ order_id: "6151242cd65812e3a5cf777a" })
          .expect(404);
      });
    });
  });

  describe("/Accept ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid order id send ", async () => {
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
            status: "Pending",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/order/accept")
          .send({ order_id: orderData._id })
          .expect(200);
      });

      it("should return 404 when order with given id didn't exist ", async () => {
        await agent
          .post("/order/accept")
          .send({ order_id: "6151242cd65812e3a5cf777a" })
          .expect(404);
      });
    });
  });

  describe("/Review ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid order id send  ", async () => {
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
            status: "Open",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/order/review")
          .send({ order_id: orderData._id })
          .expect(200);
      });

      it("should return 200 when valid order id send and status is Reviewing ", async () => {
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
            status: "Reviewing",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/order/review")
          .send({ order_id: orderData._id })
          .expect(200);
      });
    });
  });

  describe("/Rating ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid order id send  ", async () => {
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
            status: "Open",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/order/rating")
          .send({ order_id: orderData._id })
          .expect(200);
      });

      it("should return 200 when valid order id send and status is Rating ", async () => {
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
            status: "Rating",
            startTime: "2021-09-18T03:56:36.310+00:00",
          })
          .set("x-auth-token", token)
          .then((res) => {
            // Save the cookie to use it later to retrieve the session
            orderData = res.body;
          });

        await agent
          .post("/order/rating")
          .send({ order_id: orderData._id })
          .expect(200);
      });
    });
  });
});
