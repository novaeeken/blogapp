const model = require('../models');

module.exports = ( sequelize, DataTypes ) => {

	// definition of the User model
	const Subscription = sequelize.define('subscriptions', { email: DataTypes.STRING }, { timestamps: false } );

	Subscription.createSubscription = ( emailaddress ) => {
            return Subscription.create({
            	email: emailaddress
            });
	};

	//return everything that has been done to this model
	return Subscription;
}; 