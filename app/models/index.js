const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('testdatabase', process.env.POSTGRES_USER, null, {
	host: 'localhost',
	dialect: 'postgres',
	storage: './session.postgres',
	logging: false
}); 

//-----------------------------------------------  MODEL DEFINITIONS  ----------------------------------------------

const User = sequelize.import('./users');
const Blogpost = sequelize.import('./posts');
const Comment = sequelize.import('./comments');
const Subscription = sequelize.import('./subscriptions');
const Prepopulate = sequelize.import('./prepopulate');

//----------------------------------------------  TABLE ASSOCIATIONS  ----------------------------------------------

User.hasMany(Blogpost);
Blogpost.belongsTo(User);

Comment.belongsTo(User);

Blogpost.hasMany(Comment);
User.hasMany(Comment);


//--------------------------------------------------  EXPORTS  ---------------------------------------------------

exports.createBlurb = (length, content) => {
	return content.split(' ').splice(0, length).join(' ') + "...";
};
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
exports.User = User;
exports.Blogpost = Blogpost;
exports.Comment = Comment;
exports.Subscription = Subscription;