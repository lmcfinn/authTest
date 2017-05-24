module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.TEXT,
            validate: {
                len: [1]
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        photo_url: {
            type: DataTypes.STRING
        }
    });

    return Event;
};
