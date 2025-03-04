const { convertValuesToArray, handlePlantData } = require("../db/utils");
const plants = require("../db/data/plantsTestTEMP.json");
// const { expect } = require("playwright/test");

const zones = require("../db/data/zones.json");


describe.skip("convert values to array", () => {
  test("should return an array", () => {
    expect(Array.isArray(convertValuesToArray(zones.zones))).toBe(true);
  });
});

describe.skip("handlePlantData", () => {
  test("should return an array", () => {
    expect(Array.isArray(handlePlantData(plants))).toBe(true);
  });
  test("should return arrays of the correct length", () => {
    expect(handlePlantData(plants)[0].length).toBe(25);
  });
});


