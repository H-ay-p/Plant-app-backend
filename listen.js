const app = require("./app.js");
const { PORT = 9090 } = process.env;

console.log("Current environment variables:");
console.log({
  DATABASE_URL: process.env.DATABASE_URL,
  API_BASE_URL: process.env.API_BASE_URL,
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
