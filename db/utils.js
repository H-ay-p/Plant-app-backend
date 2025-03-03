function convertValuesToArray(objects) {
  const objectsCopy = [...objects];
  const returnArray = objectsCopy.map((object) => {
    return Object.values({ ...object });
  });
  console.log(returnArray);
  return returnArray;
}
module.exports = { convertValuesToArray };
