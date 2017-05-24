module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        author: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        publish_date: {
            type: DataTypes.DATEONLY,
            validate: {
                len: [1]
            }
        },
        photo_url: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
    });

    return Blog;
};