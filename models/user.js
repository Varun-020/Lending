/**
 * User database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            fullName: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            firstName: {
                type: DataTypes.STRING(80),
                allowNull: true,
            },
            lastname: {
                type: DataTypes.STRING(80),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            emailVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            emailVerificationToken: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            emailVerificationTokenExpiresAt: {
                type: DataTypes.DATE,
            },
            passwordResetToken: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            passwordResetTokenExpiresAt: { type: DataTypes.DATE },
            phoneNumber: {
                type: DataTypes.STRING(24),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
            },
            disabled: {
                type: DataTypes.STRING(1),
                allowNull: false,
                defaultValue: false,
            },
            userType: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            pin: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            logged_in: {
                type: DataTypes.ENUM('yes', 'no'),
                allowNull: true,
                defaultValue: 'no'
            },
            passwordResetOtp: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
        },
        {
            timestamps: true,
            paranoid: true,
        },
    );

    return User
}

