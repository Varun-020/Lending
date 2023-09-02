const { body, validationResult } = require("express-validator");
const db = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../services/generateOTP");
const { sendMail } = require("../services/sendOtpThroughMail");
const { createAndStoreOtpForEmail, createAndStoreOtpForPhone, createAndStoreOtpForLogin } = require("./otpServices");
const Sequelize = require("sequelize");
const { sendLoginOtpMail } = require("../services/sendLoginOtpToEmail");

const User = db.user
const UserOTP = db.userotp


module.exports.registerValidations = [
    body("firstName").not().isEmpty().withMessage("Firstname required"),
    body("lastName").not().isEmpty().withMessage("Lastname required"),
    body("phoneNumber").isLength({ min: 10, max: 10 }).withMessage("phone number is not valid"),
    body("email").isEmail().withMessage("Email required"),
    body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters minimum "),
];

module.exports.register = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    const errors = validationResult(req);
    const Sequulize = db.sequelize;
    const Op = Sequelize.Op
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const checkUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email }, { phoneNumber }
                ]
            }
        });
        if (checkUser) {
            if (checkUser.emailVerified && checkUser.phoneVerified) return res.status(400).json({ errors: [{ msg: "User with email or phone already exist. Plese Login!" }] });
            else if (!checkUser.emailVerified) {
                let otp = generateOTP();
                let optStored = await createAndStoreOtpForEmail(checkUser, otp);
                if (optStored) {
                    let send = await sendMail({ receiver: email, subject: "OTP for Registration", otp })
                    return res.status(200).json({ redirectTo: 'email', msg: "verify your email to continue registeration", userId: checkUser.id, userEmail: checkUser.email });
                } else {
                    return res.status(400).json({ errors: [{ msg: "Error while generating and sending OTP" }] });
                }
            }
            else if (checkUser.emailVerified && !checkUser.phoneVerified) {
                let otp = generateOTP();
                let optStored = await createAndStoreOtpForPhone(checkUser, otp);
                if (optStored) {
                    //send otp
                    return res.status(200).json({ redirectTo: 'phone', msg: "verify your phone to continue egisteration", userId: checkUser.id, userPhone: checkUser.phoneNumber })
                }
                else {
                    return res.status(400).json({ errors: [{ msg: "Error while generating and sending OTP" }] });
                }
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        try {
            const user = await User.create({
                fullName: firstName + ' ' + lastName,
                firstName,
                lastName,
                phoneNumber,
                email,
                password: hash,
                // logged_in: 'yes'
            });
            let otp = generateOTP();
            let optStored = await createAndStoreOtpForEmail(user, otp);
            if (optStored) {
                let send = await sendMail({ receiver: email, subject: "OTP for Registration", otp })
                return res.status(200).json({ redirectTo: 'email', msg: "verify your email to continue registeration", userId: user.id, userEmail: user.email });
            } else {
                return res.status(400).json({ errors: [{ msg: "Error while generating and sending OTP" }] });
            }
        } catch (error) {
            return res.status(500).json({ errors: error.message })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error })
    }
};

module.exports.verifyEmail = async (req, res) => {
    const { emailOtp, userId } = req.body;
    console.log(req.body);
    try {
        const userOTP = await UserOTP.findOne({
            where: { id: userId }
        });
        if (userOTP) {
            if (emailOtp == userOTP.emailVerificationOtp) {
                let user = await User.findOne({ where: { id: userId } });
                user = await user.update({ emailVerified: true });
                let otp = generateOTP();
                let optStored = await createAndStoreOtpForPhone(userOTP, otp);
                if (optStored) {
                    //send otp
                    return res.status(200).json({ redirectTo: 'phone', msg: "verify your phone to continue egisteration", userId: user.id, userPhone: user.phoneNumber })
                }
                else {
                    return res.status(400).json({ errors: [{ msg: "Error while generating and sending OTP" }] });
                }
            }
            return res.status(400).json({ errors: [{ msg: "Invalid OTP, Please try again !" }] });
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({ errors: [{ msg: "Internal Server Error" }] });
    }
}

module.exports.verifyPhone = async (req, res) => {
    const { phoneOtp, userId } = req.body;
    console.log(req.body);
    try {
        const userOTP = await UserOTP.findOne({
            where: { id: userId }
        });
        if (userOTP) {
            if (phoneOtp == userOTP.phoneVerificationOtp) {
                let user = await User.findOne({ where: { id: userId } });
                user = await user.update({ phoneVerified: true, logged_in: 'yes' });
                const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '7d' });
                return res.json({ msg: "Registration Successful", token });
            }
            return res.status(400).json({ errors: [{ msg: "Invalid OTP, Please try again !" }] });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ errors: [{ msg: "Internal Server Error" }] });
    }
}

module.exports.loginValidations = [
    body("email").isEmail().withMessage("email required"),
    body("password").not().isEmpty().withMessage("password required"),
];
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        var user = await User.findOne({
            where: {
                email
            }
        });

        if (user) {
            const matched = await bcrypt.compare(password, user.password);
            if (matched) {
                user = await user.update({
                    logged_in: 'yes'
                })
                const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '7d' });
                return res.json({ msg: "Login Successful", token });
            } else {
                console.log("else 401");
                return res.status(400).json({ errors: [{ msg: "Password is not correct" }] });
            }
        } else {
            return res.status(404).json({ errors: [{ msg: "User not found" }] });
        }
    } catch (error) {
        return res.status(500).json({ errors: error });
    }

};

module.exports.otpLoginEmailValidations = [
    body("email").isEmail().withMessage("Enter valid email"),
];

module.exports.sendOtpToMail = async (req, res) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            let otp = generateOTP();
            let optStored = await createAndStoreOtpForLogin(user, otp);
            if (optStored) {
                let send = await sendLoginOtpMail({ receiver: user.email, subject: "OTP for Login", otp })
                return res.status(200).json({ redirectTo: 'enterOTP', msg: "Enter OTP to login", userId: user.id, userEmail: user.email });
            } else {
                return res.status(400).json({ errors: [{ msg: "Error while generating and sending OTP" }] });
            }
        } else {
            return res.status(400).json({ errors: [{ msg: "User does not exist with this email" }] });
        }
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
}

module.exports.verifyOTPForLogin = async (req, res) => {
    const { emailOtp, userId } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        var user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (user.loginOtp == emailOtp) {
            user = await user.update({
                logged_in: 'yes'
            })
            const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '7d' });
            return res.json({ msg: "Login Successful", token });
        } else {
            console.log("else 401");
            return res.status(400).json({ errors: [{ msg: "Oops, Invalid OTP!" }] });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error });
    }
}

module.exports.logout = async (req, res) => {
    let { email } = req.body;
    try {
        let user = await User.findOne({
            where: {
                email
            }
        })

        user = await user.update({
            logged_in: 'no'
        });

        return res.json({ msg: "Logout Successful" });

    } catch (error) {
        return res.status(500).json({ errors: error });
    }
}
