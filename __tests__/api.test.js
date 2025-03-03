const app = require('../app.js')
const request = require("supertest");
const db = require("../db/connection.js");
const getWeather = require ("../Data_collection_files/api.js")


describe("getWeather", () => {
    test("fetches weather data", () => {
      return getWeather().then((data) => {
        expect(data).toBeDefined();
      });
    });
  });