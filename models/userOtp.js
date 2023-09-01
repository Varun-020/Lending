/**
 * User database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function (sequelize, DataTypes) {
    const UserOTP = sequelize.define(
        'userotp',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
            emailVerificationOtp: {
                type: DataTypes.STRING(6),
                allowNull: true,
            },
            phoneVerificationOtp: {
                type: DataTypes.STRING(6),
                allowNull: true,
            },
        },
        {
            timestamps: true,
            paranoid: true,
        },
    );

    return UserOTP
}

