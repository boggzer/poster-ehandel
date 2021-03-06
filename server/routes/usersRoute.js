const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers");

// const getUser = require("../Middlewares/getUser.js");

// Getting specific users
router.get("/adminRequest", controller.getSpecificUsers);

//Getting logged in user
router.get("/loggedIn", controller.getLoggedInUser);

// Creating one
router.post("/register", controller.registerNewUser);

router.put("/", controller.updateUser);

module.exports = router;
