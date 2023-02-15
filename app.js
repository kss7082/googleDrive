const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./api/routes");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

  app.use(morgan("dev"));
  app.use(routes);

  return app;
};

module.exports = { createApp };
