const express = require("express");
const { registerValidations, register, loginValidations, login, logout, verifyEmail, verifyPhone } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", registerValidations, register);
router.post("/verifyEmailForRegister", verifyEmail);
router.post("/verifyPhoneForRegister", verifyPhone);
router.post("/signinwithpassword", loginValidations, login);
router.post("/logout", logout);


module.exports = router;