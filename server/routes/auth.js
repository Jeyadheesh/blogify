const express = require("express");
const router = express.Router();
const authcontrol = require("../controllers/authcontrol");

router.post("/register", authcontrol.register);
router.post("/login", authcontrol.login);
router.get("/coo", authcontrol.coo);
router.get("/logout", authcontrol.logout);

module.exports = router;
