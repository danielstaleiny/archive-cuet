require("dotenv").config(); // load .env

const { log } = console;
const { URL } = process.env;

log("init");

log("URL env test: ", URL);
