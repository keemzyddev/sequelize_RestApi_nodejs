const express = require("express");
const Sequelize = require("sequelize");

const db = require("./config/db");

// test db
db.authenticate()
  .then(() => {
    console.log("db created");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

//body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/users", require("./routes/routes"));

app.use((req, res) => {
  res.status(400).send("404 Page Not Found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
