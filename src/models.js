const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // Database file
});

const RateLimit = sequelize.define("RateLimit", {
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requests_today: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  requests_last_minute: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  last_request_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { sequelize, RateLimit };
