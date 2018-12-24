module.exports = function (sequelize, DataTypes) {
    return sequelize.define('note', {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 2000]
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};