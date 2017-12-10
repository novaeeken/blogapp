const express = require('express');
const router = express.Router();
const model = require('../models');

//--------------------------------------------------- ROUTING ----------------------------------------------------

// POST "subsribe" ----------------------------------
router.post('/subscribe', function(req, res){
	model.Subscription.createSubscription(req.body.email);
	res.redirect("/?subscription=" + encodeURIComponent('true'));
});

module.exports = router;
