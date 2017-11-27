
const sequelize = new Sequelize('blog-app', process.env.POSTGRES_USER, null, {
	host: 'localhost',
	dialect: 'postgres',
	storage: './session.postgres' // sequelize store
}); 

//-----------------------------------------------  MODEL DEFINITION  ----------------------------------------------

const Blogpost = sequelize.define('blogposts', { title: type: Sequelize.STRING, body: Sequelize.TEXT } ); 

// const Comment = sequelize.define('comments',{
// 	name: {
// 		type: Sequelize.STRING
// 	},
// 	email: {
// 		type: Sequelize.STRING
// 	},
//	body: {
//		type: Sequelize.TEXT
//	});

const User = sequelize.define('users', {
	email: {
		type: Sequelize.STRING,
		unique: true
	}, 
	fullname: {
		type: Sequelize.STRING
	},
	username: {
		type: Sequelize.STRING,
		unique: true 
	}, 
	password: {
		type: Sequelize.STRING
	},{
	timestamps: false 
});

//---------------------------------------------  TABLE ASSOCIATIONS  ---------------------------------------------

User.hasMany(Blogpost); // o:m relationshop - target will get foreign key 
Blogpost.belonsTo(User); // o:o source gets foreign key, but its already defined so now just describes relationship 

sequelize.sync();


//--------------------------------------------  MAPPING AND EXPORTING  --------------------------------------------

function mapOut(object) {
    return object.map(i => i.dataValues);
};

module.exports = {
    mapOut: map0ut,
    sequelize: sequelize,
    User: User,
    Blogpost: Blogpost
};