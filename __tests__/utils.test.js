const { convertValuesToArray, handlePlantData } = require("../db/utils");
const plants = require("../db/data/plantsTestTEMP.json");
const { expect } = require("playwright/test");

describe("convert values to array", () => {
  test("should return an array", () => {
    expect(Array.isArray(convertValuesToArray(plants))).toBe(true);
  });
});

describe.skip("handlePlantData", () => {
  test("should return an array", () => {
    expect(Array.isArray(handlePlantData(plants))).toBe(true);
  });
  test("should return arrays of the correct length", () => {
    console.log(handlePlantData(plants)[0]);
    expect(handlePlantData(plants)[0].length).toBe(25);
  });
});
