const express = require("express");
const {
  createOrder,
  getOrders,
} = require("../../controllers/client/pizza.controller");
const router = express.Router();

// ROUTES
router.route("/").post(createOrder); // order route
router.route("/orders").post(getOrders); // order route

module.exports = router;
