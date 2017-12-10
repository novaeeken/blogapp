const model = require('../models');
const bcrypt = require('bcrypt');

module.exports = ( sequelize, DataTypes ) => {

	// definition of the User model
	const User = sequelize.define('users', {
		firstname: DataTypes.STRING,
		// unique: true
		username: {type: DataTypes.STRING},
		email: {type: DataTypes.STRING},
		password: DataTypes.STRING,
		about: DataTypes.TEXT, 
		profile: DataTypes.STRING
		}, {
			timestamps: false 
		}
	);

	User.createUser = ( registerDetails ) => {
		return bcrypt.hash(registerDetails.password, 10).then( hash => {
            return User.create({
            	firstname: registerDetails.firstname,
				username: registerDetails.username,
				email: registerDetails.email,
				password: hash,
				about: registerDetails.about,
				profile: registerDetails.profile,
            });
        });
	}; 

	User.userExists = ( emailaddress ) => {
        return User.findOne({
            where: { 
            	email: emailaddress 
            }
        });
    };

    User.fetchProfile = ( userId ) => {
    	return Promise.all([
            User.findOne({
				where: {
					id: userId
				}
            }),
            model.Blogpost.findAll({
                where: {
					userId: userId
				}
            })
        ]);
    }; 

    User.updateAbout = ( userId, value) => {
		return User.update({
			about: value
		}, {
			where: {id: userId}
		})
    };

    User.updateProfilePic = ( userId, value) => {
    	return User.update({
			profile: value
		}, {
			where: {id: userId}
		})
    }

	//return everything that has been done to this model
	return User;

}; 