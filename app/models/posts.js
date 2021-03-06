const model = require('../models');

module.exports = ( sequelize, DataTypes ) => {

	// definition of the User model
	const Blogpost = sequelize.define('blogposts', { 
		type: DataTypes.STRING,
		title: DataTypes.STRING, 
		content: DataTypes.TEXT,
		readlength: DataTypes.INTEGER,
		posted: DataTypes.DATEONLY,
		likes: DataTypes.INTEGER,
		image: DataTypes.STRING,
		}, {
			timestamps: false 
		}
	);

	Blogpost.allPosts = () => {
		return Promise.all([
	        Blogpost.findAll({
	        	include: [{
					model: model.User
				}],
				order: [['id', 'DESC']]
	        }),
	        Blogpost.findAll({
	        	order: [['likes', 'DESC']]
	        })
        ])
    };

    Blogpost.onePost = ( blogId ) => {
        return Promise.all([
            Blogpost.findOne({
				where: {
					id: blogId
				},
				include: [{
					model: model.User
				}]
            }),
            model.Comment.findAll({
                where: {
					blogpostId: blogId
				},
				include: [{
					model: model.User
				}]
            })
        ]);
    };

    Blogpost.createPost = ( user, contents ) => {
    	return Blogpost.create({
    		type: contents.type,
			title: contents.title,
			content: contents.content,
			readlength: contents.readlength,
			posted: contents.posted,
			likes: contents.likes,
			image: contents.image,
			userId: user
    	});
    }

    Blogpost.updatePic = ( blogId, value) => {
    	return Blogpost.update({
			image: value
		}, {
			where: {id: blogId}
		})
    }

    Blogpost.addLike = ( blogId ) => {
    		Blogpost.update({ likes: sequelize.literal('likes + 1') }, { where: { id: blogId } });
    }

	//return everything that has been done to this model
	return Blogpost;

}; 