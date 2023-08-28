const { body, validationResult } = require("express-validator");
const db = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.user

module.exports.registerValidations = [
    body("firstName").not().isEmpty().withMessage("Firstname required"),
    body("lastName").not().isEmpty().withMessage("Lastname required"),
    body("email").isEmail().withMessage("Email required"),
    body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters minimum "),
];

module.exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const checkUser = await User.findOne({
            where: { email }
        });
        if (checkUser) return res.status(400).json({ errors: [{ msg: "Email is already taken" }] });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        try {
            const user = await User.create({
                fullName: firstName + ' ' + lastName,
                firstName,
                lastName,
                email,
                password: hash,
                logged_in: 'yes'
            });
            const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '7d' });
            return res.status(200).json({ msg: "Registration Successful", token });
        } catch (error) {
            return res.status(500).json({ errors: error.message })
        }

    } catch (error) {
        return res.status(500).json({ errors: error })
    }
};

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
