const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seed.js");
const plants = require("../db/data/plantsTest.json");
const users = require("../db/data/testUsers.json");
const zones = require("../db/data/zones.json");
const ownedPlants = require("../db/data/ownedPlants.json");
const favePlants = require("../db/data/favePlants.json");

beforeAll(() => seed(users, plants, zones, ownedPlants, favePlants));
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
      .then(({ body }) => {
        const plant = body.plant;
        expect(plant.common_name).toEqual("anthurium");
        expect(plant.watering).toEqual("Average");
      });
  });
  test("400: id not a number", () => {
    return request(app)
      .get("/api/plants/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe("Bad Request");
      });
  });
  test("404: no plants with that id number", () => {
    return request(app)
      .get("/api/plants/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe(
          "No plant associated with this id number"
        );
      });
  });
});

describe("GET /api/users/:user_id", () => {
  test("200: responds with correct user information", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body }) => {
        const user = body.user;
        expect(user).toMatchObject({
          user_id: 1,
          username: "ReymundoCancer",
          email: "Reymundo15@yahoo.com",
          geolocation: expect.any(String),
        });
      });
  });
  test("400: id not a number", () => {
    return request(app)
      .get("/api/users/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe("Bad Request");
      });
  });
  test("404: no user with that id number", () => {
    return request(app)
      .get("/api/users/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe(
          "No user associated with this id number"
        );
      });
  });
});

describe("POST /api/users", () => {
  test("should add a new user and return correct user details", () => {
    const newUser = {
      username: "RachelJelly",
      email: "RachelJelly@yahoo.com",
      geolocation: "51.633476273314955, -0.765394936606981",
    };

    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then((response) => {
        expect(response.body.user).toMatchObject({
          user_id: 6,
          username: "RachelJelly",
          email: "RachelJelly@yahoo.com",
          geolocation: expect.any(String),
        });
      });
  });
  test("should return 400 if username is missing", () => {
    const newUser = {
      email: "RachelJelly@yahoo.com",
      geolocation: "51.633476273314955, -0.765394936606981",
    };

    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Username is required");
      });
  });
  test("should return 400 if email is missing", () => {
    const newUser = {
      username: "RachelJelly",
      geolocation: "51.633476273314955, -0.765394936606981",
    };

    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Email is required");
      });
  });
});

describe("getZonesByUserID", () => {
  test("200: responds with correct zone information", () => {
    return request(app)
      .get("/api/zones/2")
      .expect(200)
      .then(({ body }) => {
        const zones = body.zones;
        expect(zones[0]).toMatchObject({
          user_key: 2,
          is_outdoor: true,
          sun_level: "full sun",
          zone_name: "balcony",
        });
        expect(zones[1]).toMatchObject({
          user_key: 2,
          is_outdoor: true,
          sun_level: "part shade",
          zone_name: "kitchen",
        });
      });
  });
  test("400: id not a number", () => {
    return request(app)
      .get("/api/zones/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe("Bad Request");
      });
  });
  test("404: user has no zones", () => {
    return request(app)
      .get("/api/zones/9")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("No zones available for that user");
      });
  });
});

describe("GET /api/users/:user_id/fave_plants", () => {
  test("200: should return users favourite plants where there is more than one", () => {
    return request(app)
      .get("/api/users/2/fave_plants")
      .expect(200)
      .then(({ body }) => {
        const favePlants = body.plants;
        expect(Array.isArray(favePlants)).toBe(true);
        expect(favePlants.length).toBeGreaterThan(0);
        favePlants.forEach((plant) => {
          expect(plant).toHaveProperty("plant_id");
          expect(plant).toHaveProperty("common_name");
        });
      });
  });
  test("200: should return users favourite plants where there is only one", () => {
    return request(app)
      .get("/api/users/5/fave_plants")
      .expect(200)
      .then(({ body }) => {
        const favePlants = body.plants;
        expect(Array.isArray(favePlants)).toBe(true);
        expect(favePlants.length).toBeGreaterThan(0);
        favePlants.forEach((plant) => {
          expect(plant).toHaveProperty("plant_id");
          expect(plant).toHaveProperty("common_name");
        });
      });
  });
  test("400: id not a number", () => {
    return request(app)
      .get("/api/users/hello/fave_plants")
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe("Bad Request");
      });
  });
  test("404: no favourite plants for that user", () => {
    return request(app)
      .get("/api/users/3/fave_plants")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("No plants favourited");
      });
  });
});

describe("POST /api/zones", () => {
  test("should add a new zone and return correct zone details", () => {
    const newZone = {
      user_key: 5,
      is_outdoor: true,
      sun_level: "full shade",
      zone_name: "garden",
    };

    return request(app)
      .post("/api/zones")
      .send(newZone)
      .expect(201)
      .then((response) => {
        expect(response.body.zone).toMatchObject({
          user_key: 5,
          is_outdoor: true,
          sun_level: "full shade",
          zone_name: "garden",
        });
      });
  });
  test("returns 404 if passed a user that doesn't exist", () => {
    const newZone = {
      user_key: 80,
      is_outdoor: true,
      sun_level: "full shade",
      zone_name: "alotment",
    };

    return request(app)
      .post("/api/zones")
      .send(newZone)
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Not Found");
      });
  });
  test("should return 400 if zone name is missing", () => {
    const newZone = {
      user_key: 8,
      is_outdoor: true,
      sun_level: "full shade",
    };

    return request(app)
      .post("/api/zones")
      .send(newZone)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Zone name is required");
      });
  });
  test("should return 400 if user key is missing", () => {
    const newZone = {
      is_outdoor: true,
      sun_level: "full shade",
      zone_name: "garden",
    };
    return request(app)
      .post("/api/zones")
      .send(newZone)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("User id is required");
      });
  });
});

describe("POST /api/users/:user_id/fave_plants", () => {
  test("should add a plant to user favourites and return correct details", () => {
    const addPlant = { user: 2, plant: 1001 };
    return request(app)
      .post("/api/users/2/fave_plants")
      .send(addPlant)
      .expect(201)
      .then((response) => {
        expect(response.body.favePlant).toMatchObject({
          favourite_plant_key: 4,
          user_key: 2,
          plant_key: 1001,
        });
      });
  });
});

describe("GET /api/users/:user_id/owned_plants", () => {
  test("200: should return users owned plants where there is more than one", () => {
    return request(app)
      .get("/api/users/2/owned_plants")
      .expect(200)
      .then(({ body }) => {
        const plants = body.plants;
        expect(Array.isArray(plants)).toBe(true);
        expect(plants.length).toBeGreaterThan(0);
        plants.forEach((plant) => {
          expect(plant).toHaveProperty("plant_id");
          expect(plant).toHaveProperty("common_name");
          expect(plant).toHaveProperty("zone_name");
        });
      });
  });

  test("200: should return users owned plants where there is only one", () => {
    return request(app)
      .get("/api/users/5/owned_plants")
      .expect(200)
      .then(({ body }) => {
        const plants = body.plants;
        expect(Array.isArray(plants)).toBe(true);
        expect(plants.length).toBeGreaterThan(0);
        plants.forEach((plant) => {
          expect(plant).toHaveProperty("plant_id");
          expect(plant).toHaveProperty("common_name");
          expect(plant).toHaveProperty("zone_name");
        });
      });
  });
  test("400: id not a number", () => {
    return request(app)
      .get("/api/users/hello/owned_plants")
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe("Bad Request");
      });
  });
  test("404: no owned plants for that user", () => {
    return request(app)
      .get("/api/users/3/owned_plants")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("No plants owned");
      });
  });
});



describe ("GET /api/plants", () => {
    test.only("should return all plants", () => {
        return request(app)
        .get("/api/plants")
        .expect(200)
        .then(({ body }) => {
            const plants = body.plants;
            expect(Array.isArray(plants)).toBe(true);
            expect(plants.length).toBeGreaterThan(0);
            plants.forEach((plant) => {
              expect(plant).toHaveProperty("plant_id");
              expect(plant).toHaveProperty("common_name");
            });
          });
        })
        test("should return plant by common_name", () => {
            return request(app)
            .get("/api/plants?common_name=anthurium")
            .expect(200)
            .then((res) => {
                const plants = res.body.plants
                expect(plants[0].common_name).toEqual("anthurium")
        })
    })
    test("should return plant by tropical", () => {
        return request(app)
        .get("/api/plants?tropical=true")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            expect(plants[0].tropical).toEqual(true)
    })
})
    test("should return plant by tropical and common_name", () => {
        return request(app)
        .get("/api/plants?tropical=false&common_name=anthurium")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            console.log(plants)
            expect(plants[0].tropical).toEqual(false)
            expect(plants[0].common_name).toEqual("anthurium")
    })
    })
    test("should return plant by tropical, common_name and sunlight", () => {
        return request(app)
        .get("/api/plants?tropical=false&common_name=anthurium&sunlight=full sun")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            console.log(plants[0].sunlight)
            expect(plants[0].tropical).toEqual(false)
            expect(plants[0].common_name).toEqual("anthurium")
            expect(plants[0].sunlight).toEqual("full sun")
    })
    })
    test("should return plant by tropical, common_name, sunlight and maintenance", () => {
        return request(app)
        .get("/api/plants?tropical=false&common_name=anthurium&sunlight=full sun&maintenance=Moderate")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            console.log(plants[0].maintenance)
            expect(plants[0].tropical).toEqual(false)
            expect(plants[0].common_name).toEqual("anthurium")
            expect(plants[0].sunlight).toEqual("full sun")
            expect(plants[0].maintenance).toEqual("Moderate")
    })
    })
    test("should return plant by tropical, common_name, sunlight, maintenance and poisonous_to_humans", () => {
        return request(app)
        .get("/api/plants?tropical=false&common_name=anthurium&sunlight=full sun&maintenance=Moderate&poisonous_to_humans=false")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            expect(plants[0].tropical).toEqual(false)
            expect(plants[0].common_name).toEqual("anthurium")
            expect(plants[0].sunlight).toEqual("full sun")
            expect(plants[0].maintenance).toEqual("Moderate")
            expect(plants[0]. poisonous_to_humans).toEqual(false)
    })
    })
    test("should return plant by tropical, common_name, sunlight, maintenance, poisonous_to_humans and poisonous_to_pets", () => {
        return request(app)
        .get("/api/plants?tropical=false&common_name=anthurium&sunlight=full sun&maintenance=Moderate&poisonous_to_humans=false&poisonous_to_pets=false")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            expect(plants[0].tropical).toEqual(false)
            expect(plants[0].common_name).toEqual("anthurium")
            expect(plants[0].sunlight).toEqual("full sun")
            expect(plants[0].maintenance).toEqual("Moderate")
            expect(plants[0]. poisonous_to_humans).toEqual(false)
            expect(plants[0]. poisonous_to_pets).toEqual(false)
    })
    })
    test("should return plant by tropical, common_name, sunlight, maintenance, poisonous_to_humans, poisonous_to_pets and edible_fruit ", () => {
        return request(app)
        .get("/api/plants?tropical=false&common_name=anthurium&sunlight=full sun&maintenance=Moderate&poisonous_to_humans=false&poisonous_to_pets=false&edible_fruit=false&edible_leaf=false")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            expect(plants[0].tropical).toEqual(false)
            expect(plants[0].common_name).toEqual("anthurium")
            expect(plants[0].sunlight).toEqual("full sun")
            expect(plants[0].maintenance).toEqual("Moderate")
            expect(plants[0].poisonous_to_humans).toEqual(false)
            expect(plants[0].poisonous_to_pets).toEqual(false)
            expect(plants[0].edible_fruit).toEqual(false)
    })
    })
    test("should return plant by tropical, common_name, sunlight, maintenance, poisonous_to_humans, poisonous_to_pets, edible_fruit and edible_leaf", () => {
        return request(app)
        .get("/api/plants?tropical=false&common_name=anthurium&sunlight=full sun&maintenance=Moderate&poisonous_to_humans=false&poisonous_to_pets=false&edible_fruit=false&edible_leaf=false")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            expect(plants[0].tropical).toEqual(false)
            expect(plants[0].common_name).toEqual("anthurium")
            expect(plants[0].sunlight).toEqual("full sun")
            expect(plants[0].maintenance).toEqual("Moderate")
            expect(plants[0].poisonous_to_humans).toEqual(false)
            expect(plants[0].poisonous_to_pets).toEqual(false)
            expect(plants[0].edible_fruit).toEqual(false)
            expect(plants[0].edible_leaf).toEqual(false)
    })
    })
    test("should return plant by tropical, common_name, sunlight, maintenance, poisonous_to_humans, poisonous_to_pets, edible_fruit, edible_leaf and flowers", () => {
        return request(app)
        .get("/api/plants?tropical=false&common_name=anthurium&sunlight=full sun&maintenance=Moderate&poisonous_to_humans=false&poisonous_to_pets=false&edible_fruit=false&edible_leaf=false&flowers=true")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            expect(plants[0].tropical).toEqual(false)
            expect(plants[0].common_name).toEqual("anthurium")
            expect(plants[0].sunlight).toEqual("full sun")
            expect(plants[0].maintenance).toEqual("Moderate")
            expect(plants[0].poisonous_to_humans).toEqual(false)
            expect(plants[0].poisonous_to_pets).toEqual(false)
            expect(plants[0].edible_fruit).toEqual(false)
            expect(plants[0].edible_leaf).toEqual(false)
            expect(plants[0].flowers).toEqual(true)
    })
    })
    test("should return plant by sunlight, poisonous_to_humans and poisonous_to_pets", () => {
        return request(app)
        .get("/api/plants?sunlight=part shade&poisonous_to_humans=false&poisonous_to_pets=false")
        .expect(200)
        .then((res) => {
            const plants = res.body.plants
            expect(plants[0].sunlight).toEqual("part shade")
            expect(plants[0].poisonous_to_humans).toEqual(false)
            expect(plants[0].poisonous_to_pets).toEqual(false)
    })
    })
        test("404: error if no plant exists with those queries", () => {
            return request(app)
            .get("/api/plants?tropical=false&common_name=anthurium&sunlight=full sun&maintenance=Moderate&poisonous_to_humans=false&poisonous_to_pets=false&edible_fruit=false&edible_leaf=false&flowers=false")
            .expect(404)
            .then((response) => {
                expect(response.body.error).toBe("No plants found matching the given criteria");
            });
        });
        test("404: error if no plant exists with those queries", () => {
            return request(app)
                .get("/api/plants?common_name=NonExistentPlant")
                .expect(404)
                .then((res) => {
                    expect(res.body.error).toEqual("No plants found matching the given criteria");
                });
        });

    })



describe("POST /api/users/:user_id/owned_plants", () => {
  test("should add a plant to users owned plants and return correct details", () => {
    const addPlant = { user: 2, plant: 1001, zone: 1 };
    return request(app)
      .post("/api/users/2/owned_plants")
      .send(addPlant)
      .expect(201)
      .then((response) => {
        expect(response.body.newPlant).toMatchObject({
          owned_plant_key: 4,
          user_key: 2,
          plant_key: 1001,
        });
      });
  });
});

