import { config } from "dotenv";
import fs from "fs";

/* .env path... */
const path = ".env.development";

if (fs.existsSync(path)) {
  const result = config({
    path,
  });
  if (result.error) {
    console.error(result.error);
    process.exit(0);
  }
} else {
  console.warn(`There is no "${path}" enviornment variable file.`);
}

// Export the values to their correct type
export default {
  HTTP_PORT: parseInt(process.env.HTTP_PORT || ""),

  // Sometimes "PORT" is a standard env variable when deploying node apps
  PSQL_HOSTNAME: process.env.PSQL_HOSTNAME,
  PSQL_USER: process.env.PSQL_USER,
  PSQL_PASSWORD: process.env.PSQL_PASSWORD,
  PSQL_PORT: parseInt(process.env.PSQL_PORT || ""),
  PSQL_DATABASE: process.env.PSQL_DATABASE,
};