const db = require('../models')
const UserOTP = db.userotp;
const User = db.user

module.exports.createAndStoreOtpForEmail = async (user, otp) => {
    console.log("user", user.id);
    try {
        let userOtpExists = await UserOTP.findOne({
            where: {
                id: user.id
            }
        });
        if (userOtpExists) {
            userOtpExists = await userOtpExists.update({
                emailVerificationOtp: otp
            });
            return true;
        } else {
            let otpEntry = await UserOTP.create({
                id: user.id,
                email: user.email,
                emailVerificationOtp: otp,
            });
            return true;
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
module.exports.createAndStoreOtpForPhone = async (user, otp) => {
    try {
        let userOtpExists = await UserOTP.findOne({
            where: {
                id: user.id
            }
        });
        if (userOtpExists) {
            userOtpExists = await userOtpExists.update({
                phoneVerificationOtp: otp
            });
            return true;
        } else {
            let otpEntry = await UserOTP.create({
                id: user.id,
                email: user.email,
                phoneVerificationOtp: otp,
            });
            return true;
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports.createAndStoreOtpForLogin = async (user, otp) => {
    try {
        let userOtpExists = await User.findOne({
            where: {
                id: user.id
            }
        });
        if (userOtpExists) {
            userOtpExists = await userOtpExists.update({
                loginOtp: otp
            });
            return true;
        }
    } catch (error) {
        console.log(error)
        return null
    }
}