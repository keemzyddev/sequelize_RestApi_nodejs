const Sequelize = require("sequelize");

module.exports = new Sequelize("test", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
  port: 5604,
});
