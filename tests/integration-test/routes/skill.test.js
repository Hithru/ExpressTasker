const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");
const agent = request.agent(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());


describe("/Skill", () => {
    describe("/add ", () => {
      describe("/ POST", () => {
        it("should return 200 when skill is created with valid data", async () => {
           
              await agent
              .post("/skill/add")
              .send({
                skillname: "Delivery Service",
                rating: 0,
                isVerified: false,
              })
              .expect(200);

          });

        it("should return 200 when all skills are returned", async () => {
           
            await agent
            .post("/skill/")
            .expect(200);

        });

        it("should return 404 when skill is not created with valid data", async () => {
           
          await agent
          .post("/skill/add")
          .send({
            skillname: null,
            rating: 0,
            isVerified: false,
          })
          .expect(404);

      });
      
      });
    });
  });
  