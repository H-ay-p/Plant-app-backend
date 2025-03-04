import fetch from "node-fetch";
import fs from "fs";
import ids from "./plantIDs.json" with {type: "json"};

// const tokenTrefle = "LUrFGpnR-VMuptTRPwFqm1aL_leJsFROMxGlN1rh-w8";

// PAGES ONE, TWO, THREE, FOUR, FIVE DONE

// async function getPlantIds() {
//   const response = await fetch(
//     "https://perenual.com/api/v2/species-list?key=sk-MFnY67bf34955572c8859&indoor=1&page=5"
//   );
//   const json = await response.json();
//   const mappedIDs = json.data.map((item) => {
    
//     return item.id;
//   });

//   const idObj = { page5: mappedIDs };

//   fs.appendFile("plantIDs.json", JSON.stringify(idObj), (error) => {
//     if (error) throw error;
//   });
// }

// getPlantIds();

// async function getPlantById(id) {
// const response = await fetch(
//     `https://perenual.com/api/v2/species/details/${id}?key=sk-MFnY67bf34955572c8859`
//   );
//   const json = await response.json();
//   const plantObj = { [id]: json };
//     fs.appendFile("plants.json", JSON.stringify(plantObj) + ',', (error) => {
//       if (error) throw error;
//     });
// }

// async function getPlants () {

// ids.page5.forEach((id) =>
// getPlantById(id))
// }

// getPlants()



