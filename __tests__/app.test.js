const app = require('../app.js')
// const request = require("supertest");
// const db = require("../db/connection.js");
const seed = require("../db/seed.js")


beforeEach(() => {
    return seed("input data source here");
  });
  
  afterAll(() => {
    return db.end(); 
  });
  