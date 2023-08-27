const express = require("express");
const { registerValidations, register, loginValidations, login, logout } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", registerValidations, register);
router.post("/login", loginValidations, login);
router.post("/logout", logout);


module.exports = router;