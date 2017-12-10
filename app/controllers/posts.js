//-------------------------------------------- DEPENDENCIES & MODULES --------------------------------------------

const express = require('express');
const router = express.Router();
const model = require('../models');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

//--------------------------------------------------- ROUTING ----------------------------------------------------


// GET PAGE "NEW POST" ----------------------------------
router.get('/newpost', function(req, res){
	res.render('newpost', {user: req.session.user});
});

// GET PAGE "BLOGPOST" ----------------------------------
router.get('/post/:id', function(req, res){

	model.Blogpost.onePost(req.params.id).then( result => {
		const comments = result[1].map(i => i.dataValues);
		
		res.render('post', { 
			user: req.session.user, 
			post: result[0].dataValues, 
			author: result[0].user.dataValues, 
			comments: comments, 
			total: comments.length,
			message: req.query.message
		});
	})
	.catch(e => console.error(e.stack));
});

// POST ACTION "NEW BLOGPOST" ----------------------------------
router.post('/newpost', function(req, res){

	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}
	const image = req.files.blogPic;
	const newPost = {
		type: req.body.type,
		title: req.body.title,
		content: req.body.content,
		readlength: Math.round(req.body.content.split(' ').length/130),
		posted: Date.now(),
		likes: 0,
		image: 'Not assigned yet'
	};

	model.Blogpost.createPost(req.session.user.id, newPost)
	.then( blogpost => {
		image.mv(`public/images/posts/${blogpost.id}.png`); 
		return blogpost.id;
	})
	.then( blogId => {
		model.Blogpost.updatePic(blogId, `/images/posts/${blogId}.png` )
		res.redirect(`/posts/post/${blogId}?message=` + encodeURIComponent('Your post was successfully added!'));
	})
	.catch(e => console.error(e.stack));
});

router.post('/like/:id', function(req, res) {
	model.Blogpost.addLike(req.params.id);
	res.redirect(`/posts/post/${req.params.id}?message=` + encodeURIComponent('true'));
	// this is not working yet
	console.log('BEEN HERE');
})

module.exports = router;