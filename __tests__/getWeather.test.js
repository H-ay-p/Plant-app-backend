const app = require('../app.js')
const request = require("supertest");
const db = require("../db/connection.js");
const getWeather = require("../db/data/getWeather.js")


describe("getWeather", () => {
    test("fetches weather data", () => {
      return getWeather().then((data) => {
        console.log(data)
        expect(data).toBeDefined();
      
      })
    })
})