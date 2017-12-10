//-------------------------------------------- DEPENDENCIES & MODULES --------------------------------------------

const express = require('express');
const router = express.Router();
const model = require('../models');

//--------------------------------------------------- ROUTING ----------------------------------------------------

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/subscriptions', require('./subscriptions'));


// GET PAGE "HOME" ----------------------------------
router.get('/', function(req, res){
	const message = req.query.message;

	model.Blogpost.allPosts().then( blogposts => {

		const allposts = blogposts[0].map(i => i.dataValues);
		const popularposts = blogposts[1].map(i => i.dataValues);

		// seperate latest post and all other posts and shorten content into a 107 or 28-word blurb 
		let latest = allposts[0];
		latest.content = model.createBlurb(107, latest.content);
		
		let posts = allposts.splice(1, allposts.length).map(i => {
			i.content = model.createBlurb(28, i.content);
			return i;
		});

		res.render('index', {message: message, latest: latest, posts: posts, popular: popularposts.splice(0, 3), user: req.session.user, subscribe: req.query.subscription}); 
	})
	.catch(e => console.error(e.stack));
});


module.exports = router;