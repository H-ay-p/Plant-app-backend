const app = require('../app.js')
const endpoints = require("../endpoints.json");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seed.js")
const plants = require("../db/data/plantsTestTEMP.json");
const users = require("../db/data/testUsers.json");

beforeEach(() => seed(users, plants));
afterAll(() => db.end());


  describe("GET /api", () => {
    test("200: Responds with an object detailing the documentation for each endpoint", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).toEqual(endpoints);
        });
    });
  });


  describe("GET /api/plants/:plant_id", () => {
    test("200: get a plant by its id with correct properties", () => {
      return request(app)
      .get("/api/plants/855")
      .then(({body}) => {
      const plant = body.plant
        expect(plant.common_name).toEqual("anthurium")
        expect(plant.watering).toEqual("Average")
      })
  })
    test("400: id not a number", () => {
        return request(app)
        .get("/api/plants/hello")
        .expect(400)
        .then((response) => {
            expect(response.body.error).toBe("Bad Request");
        });
    });
    test("404: no article with that id number", () => {
        return request(app)
        .get("/api/articles/9999999999")
        .expect(404)
        .then((response) => {
        console.log(response)
        expect(response.body.error).toBe("Endpoint not found");
        })
        })
        });

