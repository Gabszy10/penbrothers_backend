const express = require("express");
const app = express();
require("dotenv").config();

// Database
const db = require("./models");

// LOGGER
const morgan = require("morgan");

// Middlewares
app.use(express.json({ extended: false })); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("dev")); // logger
app.use(express.static(__dirname + "/assets")); // public folder

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
  next();
});

//REST API USER ROUTES
app.use("/api/pizza/", require("./routes/client/pizza.route"));

db.sequelize
  .sync()
  .then(() => {
    app.listen(8080, () => {
      console.log(`Started on  port 8080`);
    });
  })
  .catch((err) => console.log(err));

// app.listen(8080, () => {
//   console.log(`Started on  port 8080`);
// });
