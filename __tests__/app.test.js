const app = require('../app.js')
const endpoints = require("../endpoints.json");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seed.js")


beforeEach(() => {
    return seed("input data source here");
  });
  
  afterAll(() => {
    return db.end(); 
  });
  

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