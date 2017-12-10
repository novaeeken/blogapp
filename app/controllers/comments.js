//-------------------------------------------- DEPENDENCIES & MODULES --------------------------------------------

const express = require('express');
const router = express.Router();
const model = require('../models');

//--------------------------------------------------- ROUTING ----------------------------------------------------


// POST ACTION "NEW COMMENT" ----------------------------------
router.post('/newcomment/:id', function(req, res){

	newComment = {
		content: req.body.comment,
		posted: Date.now()
	}
		
	model.Comment.createComment(req.session.user.id, req.params.id, newComment).then( () => {
		res.redirect(`/posts/post/${req.params.id}`);	
	})
	.catch(e => console.error(e.stack));
})

module.exports = router;