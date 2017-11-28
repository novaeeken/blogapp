
//--------------------------------------------   IMPORT DEPENDENCIES --------------------------------------------

const express = require('express')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const db = require('./app/models/models.js'); // require exported table definitions and associations
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require('bcrypt');
const saltRounds = 10;

//-----------------------------------------------  CONFIG MODULES  -------------------------------------------------

const app = express();

app.use(express.static('public'))
app.set('views','app/views')
app.set('view engine','pug')

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));

// Sessions 
app.use(session({
	store: new SequelizeStore({
		db: db.sequelize,
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

//---------------------------------------------------  ROUTING  ---------------------------------------------------


// GET PAGE "HOME" ----------------------------------
app.get('/', function(req, res){
	const message = req.query.message; 
	const user = req.session.user;

	let latest = {};
	let posts = [];

	db.Blogpost.findAll({ 
		include: [{
			model: db.User
		}],
		order: [['id', 'DESC']]
	})
	.then( blogposts => {

		//store the latest post in a 'lastest'
		latest = blogposts[0].dataValues;
		// shorthen the content into a 107-word blurb and then assign it back into the 'latest' object
		let blurb = latest.content.split(' ').splice(0, 107).join(' ') + "...";
		latest.content = blurb; 

		//store all the other posts into 'posts'
		posts = blogposts.splice(1, blogposts.length);
		
		//shorten all the contents so they fit into the blurb
		posts = posts.map(i => {
			const split = i.content.split(' ');
			const short = split.splice(0, 28).join(' ') + "...";
			i.content = short;
			return i;
		});
		res.render('index', {user: user, message: message, latest: latest, posts: posts});
	})
	.catch(e => console.error(e.stack));
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
	let message = req.query.message
	let profile = {};

	db.User.findById(user.id)
	.then( userprofile => {
		profile = userprofile.dataValues;
	})
	.then( () => {
		return db.Blogpost.findAll({
			where: {
				userId: user.id
			}
		})
	})
	.then( blogposts => {
		let posts = blogposts.map(i => i.dataValues);
		
		// shorthen the content so it fits the blurb
		posts = posts.map(i => {
			const split = i.content.split(' ');
			const short = split.splice(0, 28).join(' ') + "...";
			i.content = short;
			return i;
		});
		console.log(posts);
		res.render('profile', {user: user, userprofile: profile, posts: posts} )
	})
	.catch(e => console.error(e.stack));
});

//GET "ABOUT" PROFILE INFO (AJAX) -------------------------------
app.get('/about', function(req, res) {
	const id = req.query.userID;

	db.User.findById(id)
	.then( user => {
		res.send({ about: user.about });
	})
	.catch(e => console.error(e.stack));
})


// POST ACTION "UPDATE PROFILE" ----------------------------------
app.post('/updateprofile', function(req, res){
	
	const user = req.session.user;
	//catch values from form fields
	const about = req.body.about;

	db.User.update({
		about: about
	}, {
		where: {id: user.id}
	})
	.then( () => {
		res.redirect('/profile');
	})
	.catch( err => console.error(err)); 

})

// POST ACTION "UPDATE PROFILE PICTURE" ----------------------------------
app.post('/updateProfilePic', function(req, res) {
	
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	const user = req.session.user;
	let profilePic = req.files.profilePic;

	profilePic.mv(`public/images/users/${user.id}.png`)
	.then( () => {
		User.update({ profile: `${user.id}.png` }, { where: {id: user.id} })
	})
	.then( () => {
		res.redirect('/profile?message=' + encodeURIComponent('Your profile was successfully updated!'));
	}) 
	.catch( err => console.error(err)); 
});


// POST ACTION "SIGN IN" ----------------------------------
app.post('/login', function(req, res){
	
	//catch values from form fields
	const email = req.body.email;
	const password = req.body.password;

	db.User.findOne({
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
	db.User.findOne({
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
				return db.User.create({
					firstname: name,
					email: email,
					username: username,
					password: hash,
					about: "",
					profile: ""
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




//------------------------------------------- POSTING  -----------------------------------------

// GET PAGE "NEW POST" ----------------------------------
app.get('/newpost', function(req, res){
	const user = req.session.user;
	res.render('newpost', {user: user});
});

// GET PAGE "BLOGPOST" ----------------------------------
app.get('/post/:id', function(req, res){
	const blogId = req.params.id;
	const user = req.session.user;
	
	let post = {};
	let author = {};
	
	// find a specific post and include details about the user that wrote it 
	db.Blogpost.findOne({
		where: {
			id: blogId
		},
		include: [{
			model: db.User
		}]
	})
	.then( blogpost => {
		// assign the blogpost and author details to variables to send later
		post = blogpost.dataValues;
		author = blogpost.user.dataValues;

		//find all the comments associated with this post and include their authors
		return db.Comment.findAll({
			where: {
				blogpostId: blogId
			},
			include: [{
				model: db.User
			}]
		})
	})
	.then( comments => {
		//map and store comments in a usable type
		const allComments = comments.map(i => i.dataValues);
		const total = allComments.length; 
		res.render('post', {user: user, post: post, author: author, comments: allComments, total: total});
	})
});

// POST "New Blogpost" ----------------------------------
app.post('/newpost', function(req, res){

	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	const user = req.session.user;
	const type = req.body.type;
	const title = req.body.title;
	const content = req.body.content;
	// const readlength = Math.round(content.split(' ').length/130);
	const image = req.files.blogPic;
	let blogId = 0; 

	console.log(type + title + content + image);

	db.User.findOne({
		where: {
			id: user.id
		}
	})
	.then( user => {
		return user.createBlogpost({
			type: type,
			title: title,
			content: content,
			image: ''
		})
	})
	.then( blogpost => {
		blogId = blogpost.id;
		image.mv(`public/images/posts/${blogpost.id}.png`)
	})
	.then( () => {
		db.Blogpost.update({ image: `${blogId}.png` }, { where: {id: blogId} })
	})
	.then( () => {
		res.redirect(`/post/${blogId}?message=` + encodeURIComponent('Your post was successfully added!'));
	})
	.catch( err => console.error(err)); 
});

//------------------------------------------- COMMENTING  -----------------------------------------

// POST ACTION "NEW COMMENT" ----------------------------------
app.post('/newcomment/:id', function(req, res){
	const currentUser = req.session.user;
	const content = req.body.comment;
	const postID = req.params.id;

	db.User.findOne({
		where: {
			id: currentUser.id
		}
	}).then(user =>{
		return user.createComment({
			content: content,
			posted: Date.now(),
			userId: user.id,
			blogpostId: postID
		})
	})
	.then( comment => {
		res.redirect(`/post/${postID}`);
	})
	.catch( err => console.error(err)); 
})



// FORMSSSSSS -----------------------------------------------------------



// POST "subsribe" ----------------------------------
app.post('/subscribe', function(req, res){
	//do something
});






