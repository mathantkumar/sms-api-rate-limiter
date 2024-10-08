const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const rateLimiterRoute = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", rateLimiterRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync(); // Sync database
});
