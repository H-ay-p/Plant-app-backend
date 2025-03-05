function convertValuesToArray(objects) {
  const objectsCopy = [...objects];
  const returnArray = objectsCopy.map((object) => {
    return Object.values({ ...object });
  });

  return returnArray;
}

function reducePlants(plants) {
  const reducedPlants = plants.map((plant) => {
    const key = Object.keys(plant)[0];
    return plant[key];
  });

  return reducedPlants;
}

function handlePlantData(plants) {
  const reducedPlants = reducePlants(plants);
  const editedPlants = reducedPlants.map((plant) => {
    let newPlant = {};
    newPlant.plant_id = plant.id;
    newPlant.common_name = plant.common_name;
    newPlant.scientific_name = plant.scientific_name[0];
    newPlant.type = plant.type;
    newPlant.cycle = plant.cycle;
    newPlant.watering = plant.watering;
    newPlant.sunlight = plant.sunlight[0];
    if (newPlant.sunlight === "full shade") {
      newPlant.sunlight = "deep shade";
    }
    if (
      newPlant.sunlight === "filtered shade" ||
      newPlant.sunlight === "part sun/part shade"
    ) {
      newPlant.sunlight = "part shade";
    }
    newPlant.maintenance = plant.maintenance ? plant.maintenance : "Moderate";
    newPlant.growth_rate = plant.growth_rate;
    newPlant.drought_tolerant = plant.drought_tolerant;
    newPlant.thorny = plant.thorny;
    newPlant.invasive = plant.invasive;
    newPlant.tropical = plant.tropical;
    if (plant.pest_susceptibility === undefined) {
      newPlant.pest_resistant = false;
    } else {
      plant.pest_susceptibility.includes("Pest resistant")
        ? (newPlant.pest_resistant = true)
        : (newPlant.pest_resistant = false);
    }
    newPlant.flowers = plant.flowers;
    newPlant.flowering_season = plant.flowering_season;
    newPlant.edible_fruit = plant.edible_fruit;
    newPlant.harvest_season = plant.harvest_season;
    newPlant.edible_leaf = plant.edible_leaf;
    newPlant.poisonous_to_humans = plant.poisonous_to_humans;
    newPlant.poisonous_to_pets = plant.poisonous_to_pets;
    newPlant.description = plant.description;
    newPlant.img_url = plant.default_image
      ? plant.default_image.small_url
      : "noImg";

    return newPlant;
  });

  return convertValuesToArray(editedPlants);
}

module.exports = { convertValuesToArray, handlePlantData, reducePlants };
