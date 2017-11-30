const model = require('../models');

module.exports = ( sequelize, DataTypes ) => {

	// definition of the User model
	const Comment = sequelize.define('comments', { 
		content: DataTypes.TEXT, 
		posted: DataTypes.DATEONLY
		}, {
			timestamps: false
		}
	);

	Comment.createComment = ( contents ) => {
		return Comment.create({
			content: contents.content,
			posted: contents.posted,
			userId: contents.userId,
			blogpostId: contents, blogpostId
		})
	};

	//return everything that has been done to this model
	return Comment;
	
};
