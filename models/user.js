
// module.exports = function(sequelize, Sequelize) {
module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('user', {
		// id: 
		// 	{ 
		// 		autoIncrement: true, 
		// 		primaryKey: true, 
		// 		type: Sequelize.INTEGER
		// 	},

		username: 
			{
				type:DataTypes.TEXT
			},

		email: 
			{ 
				type:DataTypes.STRING, 
				validate: {isEmail:true} 
			},

		admin: 
			{
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},

		password: 
			{
				type: DataTypes.STRING,allowNull: false 
			},

		last_login: 
			{
				type: DataTypes.DATE
			},
        
        status: 
        	{
        		type: DataTypes.ENUM('active','inactive'),
        		defaultValue:'active' 
        	}

});

	return User;

}

