//-------------------------------------------- DEPENDENCIES & MODULES --------------------------------------------

const express = require('express');
const router = express.Router();
const model = require('../models');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');

router.use(fileUpload());

//--------------------------------------------------- ROUTING ----------------------------------------------------

// GET PAGE "LOG IN" ----------------------------------
router.get('/login', function(req, res) {
	res.render('login', {message: req.query.message}); 
});

// GET PAGE "REGISTER" ----------------------------------
router.get('/register', function(req, res) {
	res.render('register', {message: req.query.message}); 
});

// GET PAGE "PROFILE" ----------------------------------
router.get('/profile', function(req, res){

	model.User.fetchProfile(req.session.user.id).then( result => {
		const profile = result[0].dataValues;
		const posts = result[1].map(i => {
			i.dataValues.content = model.createBlurb(28, i.content);
			return i.dataValues;
		});
		res.render('profile', {user: req.session.user, userprofile: profile, posts: posts} ); 
	})
	.catch(e => console.error(e.stack));
});

//GET "ABOUT" PROFILE INFO (AJAX) -------------------------------
// router.get('/about', function(req, res) {

// 	model.User.finmodelyId(req.query.userID)
// 	.then( user => {
// 		res.send({ about: user.about });
// 	})
// 	.catch(e => console.error(e.stack));
// })


// POST ACTION "UPDATE PROFILE" ----------------------------------
router.post('/updateprofile', function(req, res){
	
	model.User.updateAbout(req.session.user.id, req.body.about)
	.then( (user) => {
		console.log('User info update-------->'+ typeof(user));
		res.redirect('/users/profile');
	})
	.catch( err => console.error(err)); 

})

// POST ACTION "UPDATE PROFILE PICTURE" ----------------------------------
router.post('/updateProfilePic', function(req, res) {
	
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	const user = req.session.user;
	let profilePic = req.files.profilePic;

	profilePic.mv(`public/images/users/${user.id}.png`)
	model.User.updateProfilePic(user.id, `/images/users/${user.id}.png`).then( () => {
		res.redirect('/users/profile?message=' + encodeURIComponent('Your profile was successfully updated!'));
	}) 
	.catch(e => console.error(e.stack));
});


// POST ACTION "SIGN IN" ----------------------------------
router.post('/login', function(req, res){
	
	//catch values from form fields
	const password = req.body.password;

	model.User.userExists(req.body.email)
	.then( user => {
		if(user !== null) {
			// if this emailaddress is known then compare passwords 
			bcrypt.compare(password, user.password).then( result => {
				if(result) {
					req.session.user = user;
					res.redirect('profile');
				} else {
					res.redirect('/users/login?message=' + encodeURIComponent('Password is incorrect', {user: req.session.user})); 
				}
			})
		} else {
			res.redirect('/users/login?message=' + encodeURIComponent(`Oops, we don't know this emailaddress!`));
		}
	})
	.catch(e => console.error(e.stack));
});

// POST ACTION "REGISTER" ----------------------------------
router.post('/register', function(req, res){
	
	//Catch all values from form fields into an object
	const registration = {
		firstname: req.body.firstname,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		about: '',
		profile: 'images/users/example.png'
	};

	//check wether user already exists
	model.User.userExists(req.body.email)
	.then( user => {
		if(user !== null) {
			res.redirect('users/register?message=' + encodeURIComponent("You already have an account on this emailaddress. Please use a different emailaddress or log in."))
		} else {
			//if not, create, login and return new user with hashed password
			model.User.createUser(registration).then( user => {
				req.session.user = user;	
				res.redirect('profile');
			})
			.catch(e => console.error(e.stack));
		}
	})
});

// GET ACTION "SIGN OUT" ----------------------------------
router.get('/logout', function(req, res) {
	req.session.destroy( (error) => {
		if(error) {
			throw error;
		}
		res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	}); 
});

module.exports = router;