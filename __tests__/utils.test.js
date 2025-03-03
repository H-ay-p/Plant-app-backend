const { convertValuesToArray, handlePlantData } = require("../db/utils");
const plants = require("../db/data/plantsTestTEMP.json");

describe("handlePlantData", () => {
  test("should return an array", () => {
    console.log(handlePlantData(plants));
    expect(Array.isArray(handlePlantData(plants))).toBe(true);
  });
});
