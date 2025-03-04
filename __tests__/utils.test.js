const { convertValuesToArray, handlePlantData } = require("../db/utils");
const plants = require("../db/data/plants.json");
const zones = require("../db/data/zones.json");
const ownedPlants = require("../db/data/ownedPlants.json");
const favePlants = require("../db/data/favePlants.json");

describe("convert values to array", () => {
  test("should return an array", () => {
    console.log(
      convertValuesToArray(ownedPlants.plants),
      convertValuesToArray(favePlants.plants)
    );
    expect(Array.isArray(convertValuesToArray(ownedPlants.plants))).toBe(true);
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
