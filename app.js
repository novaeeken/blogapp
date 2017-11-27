
//--------------------------------------------   IMPORT DEPENDENCIES --------------------------------------------


const express = require('express')
const bodyParser = require('body-parser')
// const db = require('./models.js'); // require our exported table models and associations
const Sequelize = require('sequelize')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require('bcrypt');
const saltRounds = 10;

//-----------------------------------------------  CONFIG MODULES  -------------------------------------------------

const app = express();

const sequelize = new Sequelize('blogapp', process.env.POSTGRES_USER, null, {
	host: 'localhost',
	dialect: 'postgres',
	storage: './session.postgres' // sequelize store
}); 

app.use(express.static('public'))
app.set('views','views')
app.set('view engine','pug')

app.use(bodyParser.urlencoded({extended: true}));

// Sessions 
app.use(session({
	store: new SequelizeStore({
		db: sequelize,
		checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
		expiration: 24 * 60 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
	}),
	secret: "safe",
	saveUnitialized: true,
	resave: false
}));

// set up server 
app.listen(3000, function(){
	console.log("App listening on port 3000")
});

//-----------------------------------------------  MODEL DEFINITION  ----------------------------------------------


// const Post = sequelize.define('posts', { name: Sequelize.STRING, description:  Sequelize.TEXT }); 

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


// User.hasMany(Post); // o:m relationshop - target will get foreign key 
// Post.belongsTo(User); // o:o source gets foreign key, but its already defined so now just describes relationship 

// // could also be Waiter.sync, or Order.sync 
sequelize.sync(); 


//---------------------------------------------------  ROUTING  ---------------------------------------------------


// GET PAGE "HOME" ----------------------------------
app.get('/', function(req, res){
	const message = req.query.message; 
	const user = req.session.user;
	res.render('index', {user: user, message: message});
});

//------------------------------------------- USERS  -----------------------------------------

// GET PAGE "LOG IN" ----------------------------------
app.get('/login', function(req, res) {
	let message = req.query.message; // will be populated if page is visited whilst user is trying to log in 
	res.render('login', {message: message}); 
});

// GET PAGE "REGISTER" ----------------------------------
app.get('/register', function(req, res) {
	let message = req.query.message; // will be populated if page is visited whilst user is trying to log in 
	res.render('register', {message: message}); 
});

// GET PAGE "PROFILE" ----------------------------------
app.get('/profile', function(req, res){
	const user = req.session.user;
	let message = req.query.message; 
	res.render('profile', {user: user} )
});

// POST ACTION "UPDATE PROFILE" ----------------------------------
app.post('/updateprofile', function(req, res){
	
	const user = req.session.user;
	//catch values from form fields
	const about = req.body.about;

	User.update({
		about: about
	}, {
		where: {id: user.id}
	})
	.then( () => {
		res.redirect('/profile?message=' + encodeURIComponent('Your profile was successfully updated!'));
	})
	.catch( err => console.error(err)); 

})


// POST ACTION "SIGN IN" ----------------------------------
app.post('/login', function(req, res){
	
	//catch values from form fields
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({
		where: {
			email: email
		}
	})
	.then( (user) => {
		if(user !== null) {
			// if we found a user with this emailaddress, proceed to compare passwords 
			bcrypt.compare(password, user.password, function(err, result) {
				if(result) {
					// if password matches, then assign the current session to this user
					req.session.user = user;
					console.log('THE SESSION IS' + req.session.username)
					// then redirect to the home page with message of succes
					res.redirect('profile');
					// res.redirect('/profile?message=' + encodeURIComponent('You are now logged in'));
				} else {
					// stay on same page but with message of error
					res.redirect('/login?message=' + encodeURIComponent('Invalid username or password.')); 
				}
			})
		};
	})
	.catch( err => console.error(err)); 
});

// POST ACTION "REGISTER" ----------------------------------
app.post('/register', function(req, res){
	
	//catch values from form fields
	const name = req.body.firstname;
	const email = req.body.email; 
	const username = req.body.username;
	const password = req.body.password;

	//check wether user already exists 
	User.findOne({
		where: {
			email: email
		}
	})
	.then( user => {
		if(user !== null) {
			res.redirect('/register?message=' + encodeURIComponent("You already have an account on this emailaddress. Please use a different emailaddress or log in."))
		} else {
			//create and return new user with hashed password
			bcrypt.hash(password, saltRounds).then(hash => {
				return User.create({
					firstname: name,
					email: email,
					username: username,
					password: hash,
					about: "",
					profile: 'images/300x300.png'
				})
			})
			.then( user => {
				req.session.user = user;
				res.redirect('profile');
			})
			.catch( err => console.error(err));
		}
	})
});

// GET ACTION "SIGN OUT" ----------------------------------
app.get('/logout', function(req, res) {
	req.session.destroy( (error) => {
		if(error) {
			throw error;
		}
		// then redirect to the home page with message of succes
		res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	}); 
}); 




//------------------------------------------- OTHER  -----------------------------------------






// GET PAGE "New Post" ----------------------------------
app.get('/newpost', function(req, res){
	res.render('newpost');
});

// GET PAGE "Post" ----------------------------------
// needs :id behind it 
app.get('/post', function(req, res){
	res.render('post');
});

// FORMSSSSSS -----------------------------------------------------------



// POST "subsribe" ----------------------------------
app.post('/subscribe', function(req, res){
	//do something
});

// POST "New Blogpost" ----------------------------------
app.post('/new-post', function(req, res){
	// do something
});




