const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Uncaught exception.`);
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
//config
dotenv.config({ path: "backend/config/config.env" });

//connect to database
connectDatabase();

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is up and running on port ${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection.`);
  server.close(() => {
    process.exit(1);
  });
});
