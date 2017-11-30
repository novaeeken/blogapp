//-------------------------------------------- DEPENDENCIES & MODULES --------------------------------------------

const express = require('express');
const router = express.Router();
const model = require('../models');

//--------------------------------------------------- ROUTING ----------------------------------------------------

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));


// GET PAGE "HOME" ----------------------------------
router.get('/', function(req, res){
	const message = req.query.message;

	model.Blogpost.allPosts().then( blogposts => {

		// seperate latest post and all other posts and shorten content into a 107 or 28-word blurb 
		let latest = blogposts[0].dataValues; 
		latest.content = model.createBlurb(107, latest.content);
		
		let posts = blogposts.splice(1, blogposts.length);
		posts = posts.map(i => {
			i.content = model.createBlurb(28, i.content);
			return i;
		});

		res.render('index', {message: message, latest: latest, posts: posts, user: req.session.user}); 
	})
	.catch(e => console.error(e.stack));
});


// POST "subsribe" ----------------------------------
router.post('/subscribe', function(req, res){
	//do something
});



module.exports = router;