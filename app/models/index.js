const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('blogapp', process.env.POSTGRES_USER, null, {
	host: 'localhost',
	dialect: 'postgres',
	storage: './session.postgres',
	logging: false
}); 

//-----------------------------------------------  MODEL DEFINITIONS  ----------------------------------------------

const User = sequelize.import('./users');
const Blogpost = sequelize.import('./posts');
const Comment = sequelize.import('./comments');
const Prepopulate = sequelize.import('./prepopulate');

//----------------------------------------------  TABLE ASSOCIATIONS  ----------------------------------------------

User.hasMany(Blogpost);
Blogpost.belongsTo(User);

User.hasMany(Comment);
Blogpost.hasMany(Comment);
Comment.belongsTo(User);


//--------------------------------------------------  EXPORTS  ---------------------------------------------------

exports.createBlurb = (length, content) => {
	return content.split(' ').splice(0, length).join(' ') + "...";
};
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
exports.User = User;
exports.Blogpost = Blogpost;
exports.Comment = Comment;