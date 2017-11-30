//-------------------------------------------- DEPENDENCIES & MODULES --------------------------------------------

const express = require('express');
const router = express.Router();
const model = require('../models');

//--------------------------------------------------- ROUTING ----------------------------------------------------


// POST ACTION "NEW COMMENT" ----------------------------------
router.post('/newcomment/:id', function(req, res){

	newComment = {
		content: req.body.comment,
		posted: Date.now(),
		userId: req.session.user.id,
		blogpostId: preq.params.id 
	}

	model.User.findById(req.session.user.id).then(user => {
		return user.model.Comment.createComment(newComment); 
	})
	.then( comment => {
		res.redirect(`/post/${preq.params.id}`);
	})
	.catch(e => console.error(e.stack));
})

module.exports = router;