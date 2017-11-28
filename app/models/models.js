const Sequelize = require('sequelize')

const sequelize = new Sequelize('blogapp', process.env.POSTGRES_USER, null, {
	host: 'localhost',
	dialect: 'postgres',
	storage: './session.postgres' // sequelize store
}); 

//-----------------------------------------------  MODEL DEFINITION  ----------------------------------------------

const Blogpost = sequelize.define('blogposts', { 
	type: Sequelize.STRING, 
	title: Sequelize.STRING, 
	content: Sequelize.TEXT, 
	image: Sequelize.STRING 
});  //readlength: Sequelize.INTEGER, posted: Sequelize.DATEONLY

const Comment = sequelize.define('comments', { 
	content: Sequelize.TEXT, 
	posted: Sequelize.DATEONLY 
	}, {
		timestamps: false
	});

const User = sequelize.define('users', {
	firstname: {
		type: Sequelize.STRING
	}, 
	username: { 
		type: Sequelize.STRING,
		unique: true
	},
	email: {
		type: Sequelize.STRING,
		unique: true
	},
	password: {
		type: Sequelize.STRING
	},
	about: {
		type: Sequelize.TEXT
	},
	profile: {
		type: Sequelize.TEXT
	}}, {
		timestamps: false
	}
);

//---------------------------------------------  TABLE ASSOCIATIONS  ---------------------------------------------

// USER ASSOCIATIONS
User.hasMany(Blogpost); // o:m relationshop - target will get foreign key 
Blogpost.belongsTo(User); // o:o source gets foreign key, but its already defined so now just describes relationship

// COMMENT ASSOCIATIONS
User.hasMany(Comment); // o:m relationshop
Blogpost.hasMany(Comment); // o:m relationshop
Comment.belongsTo(User);
Comment.belongsTo(Blogpost);

// WHERE DO I PUT THIS? 
// { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }

// // could also be Waiter.sync, or Order.sync 
sequelize.sync(); 

//--------------------------------------------  MAPPING AND EXPORTING  --------------------------------------------


module.exports = {
    sequelize: sequelize,
    User: User,
    Blogpost: Blogpost,
    Comment: Comment
};