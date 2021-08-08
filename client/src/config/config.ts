import dotenv from 'dotenv';

dotenv.config();


//* API config
const SERVER_HSOTNAME = process.env.SERVER_HSOTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 7000;

const SERVER = {
  hostname: SERVER_HSOTNAME,
  port: SERVER_PORT,
}

const config = {
  server: SERVER
}

export default config;