const model = require('../models');

module.exports = ( sequelize ) => {
    sequelize.sync({force:true}).then(() => { 

    	//create Thomas
        model.User.createUser({
        	firstname: 'Thomas',
			username: 'Thomas1990',
			email: 'thomas@gmail.com',
			password: '123',
			about: `Isaiah Jamar Thomas (born February 7, 1989) is an American professional basketball player for the Cleveland Cavaliers of the National Basketball Association (NBA).`,
			profile: '/images/users/1.png' 
		})
        .then((user) => {
            user.createBlogpost({
            	type: 'Recipe',
				title: 'Delicious gluten-free pizza crust',
				content: `This time last summer our friend Laura found out she had food allergies. Not the kind that can be cured with an enzyme pill or avoidance of cheese. The kind that require eliminating half your diet. She was heartbroken for it and we were, too. We ate together all the time and the allergies imparted all kinds of complications. But after rallying our spirits we ventured to explore new and better recipes together, namely ones free of gluten since it seemed to be the main culprit in her diet. Laura’s family has always had homemade pizza on Sunday nights – a tradition she loved then resented after she couldn’t participate. She and I both searched for gluten-free crust alternatives but always ended up with doughy, bean-flavored, less-than-memorable results. Then Laura had the brilliant idea to try her mom’s traditional crust recipe, only subbing in a gluten free flour blend in place of all purpose to keep it allergen-free. The result – oh man – no joke, the best gluten free pizza crust I’ve ever had. She even prefers it over restaurant versions now and I nearly prefer it over GLUTEN versions at regular pizzerias! It’s that good. If you have gluten free eaters in your life you simply must try this recipe. As Nacho Libre says, “It’s the baaayyyyysst.”`,
				readlength: 2,
				posted: Date.now(),
				likes: 0,
				image: '/images/posts/3.png'
            })
            .then( post => {
            	model.Comment.create({
					content: `This looks so good Thomas, where did you learn this? Have you been vegan for a long time?`,
					posted: Date.now(),
					userId: 3,
					blogpostId: post.id
	            })
            })
           
            user.createBlogpost({
            	type: 'Tips&Tricks',
				title: 'How to impress all of your friends at your dinner party',
				content: `If I’d invited a group of friends around for a dinner party eighteen months ago, chances are, my invitation would have been met with a series of lavish excuses. Oh, it’s the day your new sofa is being delivered? Sure! Ah, your grandma’s birthday – no problem. The reality is, they just didn’t want to be put through the agony of having to pretend that my home cooking was edible.\nI’ve always loved cooking, but aside from Mac & Cheese, sadly I don’t seem to have many skills in that field, so since living with Charlie (and it’s been over 5 years!) I’ve let him take charge when it comes to cooking. That, however, was until we discovered the Thermomix. If you follow me on Instagram or have watched my What I eat in a Day videos or vlogs, you’re probably already familiar with how much I depend on this multi-tasking kitchen appliance.\nThe Thermomix can weigh, blend, whip, stir, chop, boil and even make dough – but what I love about it the most, is it’s in-built recipes that give even a novice in the kitchen like myself the ability to be able to cook hundreds of unbelievably tasty dishes. The screen on the device has easy to follow recipes built in and not only does it tell you the steps, but it’s pre-programmed to do it all for you. It’s fool proof – all you have to do is put in the ingredients and follow the instructions (usually this is a case of turning the dial to change the speed of the blades) and the Thermomix does the rest. In the times before we had a Thermomix, it would take me an entire day and no doubt a lot of failed attempts to be able to prepare a three course meal, but in the Thermomix I can cook it with ease and confidence – oh and did I mention the third course is Ice Cream and Pistachio, White Chocolate and Raspberry gooey warm brownies? Yep, the Thermomix does all of that too.`,
				readlength: 2,
				posted: Date.now(),
				likes: 1,
				image: '/images/posts/4.png'
            })

            user.createBlogpost({
            	type: 'Recipe',
				title: 'Vegan chocolate brownies',
				content: `“Gooey, nutty and seriously chocolaty, these vegan brownies are a total joy to eat!”\n<strong> Ingredients </strong>\n5 tablespoons sunflower oil (plus extra for greasing)\n200g dairy-free dark chocolate\n170 g self-raising flour\n3 heaped teaspoons cocoa powder\n180 g golden caster sugar\nsea salt\n1 vanilla pod\n230 ml unsweetened organic soya milk\n200 g pecan nuts\n\n<strong> Method: </strong>\nPreheat the oven to 180ºC/350ºF. Grease a square baking tin (roughly 20cm) with a little oil, then line with greaseproof paper. Place a heatproof bowl over a pan of simmering water, making sure the base doesn’t touch the water. Break 150g of chocolate into the bowl and allow it to melt, then set aside to cool slightly. Meanwhile, sieve the flour and cocoa powder into a large bowl, then stir in the sugar and a pinch of salt. Halve the vanilla pod lengthways, scrape out the seeds, then add them to the bowl. Stir in the oil, soya milk and melted chocolate until combined.Roughly chop and stir in the remaining chocolate and most of the pecans, reserving a few for the top. Pour the mixture into the prepared tin, spreading it out evenly. Sprinkle over the remaining pecans, then place into the hot oven for 20 to 25 minutes, or until cooked on the outside, but still gooey in the middle.Leave to cool for around 5 minutes, turn out onto a wire cooling rack, then serve warm with a scoop of vanilla ice cream, if you’re feeling extra indulgent.`,
				readlength: 1,
				posted: Date.now(),
				likes: 3,
				image: '/images/posts/5.png'
            })
            .then( post => {
            	model.Comment.create({
					content: `Such a good receipe! I have just recently become a vegan (and I'm a brownie addict) so I thought I had to swear them off for life. Will try this tomorrow!`,
					posted: Date.now(),
					userId: 3,
					blogpostId: post.id
	            })
	            .then ( () => {
	            	model.Comment.create({
						content: `Nice, didn't know about this. My sister is vegan an I always struggle so much to bake anything for her!`,
						posted: Date.now(),
						userId: 2,
						blogpostId: post.id
	            	})
	            })
            })
        })
		
		//Create Nova
		model.User.createUser({
        	firstname: 'Nova',
			username: 'nova_alexandra',
			email: 'nova@gmail.com',
			password: '123',
			about: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, voluptatibus quidem maiores. Fugit odit quam, quo adipisci voluptatem sint veniam id nulla necessitatibus sapiente omnis vitae tempora veritatis accusantium nemo dignissimos temporibus doloribus! Molestiae quibusdam, qui nemo debitis corporis officiis.`,
			profile: '/images/users/2.png'
		})
        .then((user) => {
            user.createBlogpost({
            	type: '5 Easy ways',
				title: 'To replace eggs',
				content: `Whether you're allergic to eggs or are just a baking fiend who can't seem to keep enough huevos stocked up in the fridge, you probably know by now that whipping up baked goods sans eggs is a serious problem. Yup, it seems like pretty much every recipe under the sun calls for the suckers.\nHowever, there are alternatives to eggs that you can use to pull off your culinary endeavors. Next time you're knee deep in a baking project that calls for eggs, give these substitutes a try.\n<strong>1.Applesauce</strong>\nUse 1/4 cup of unsweetened applesauce in place of one egg in most baking recipes. Some sources say to mix it with 1/2 teaspoon of baking powder. If all you have is sweetened applesauce, then simply reduce the amount of sugar in the recipe. Applesauce is also a popular healthy replacement for oil in many baked goods.\n<strong>2. Banana</strong>\nUse 1/4 cup of mashed banana (from about half a banana) instead of one egg when baking. Note that this may impart a mild banana flavor to whatever you are cooking, which could be a good thing.\n<strong>3. Flaxseeds</strong>\nBelieve it or not, hearty-healthy flaxseeds can be used as an egg substitute! Simply mix 1 tablespoon of ground flaxseeds with 3 tablespoons of water until fully absorbed and viscous. Use in place of one egg. (You can use pre-ground flaxseeds or grind them yourself in a spice or coffee grinder.)`,
				readlength: 1,
				posted: Date.now(),
				likes: 6,
				image: '/images/posts/1.png'
            })
	        .then( post => {
	        	model.Comment.create({
					content: `This is so handy, thanks for this!`,
					posted: Date.now(),
					userId: 2,
					blogpostId: post.id
	            })
	        })
        });

        //create Vincent
        model.User.createUser({
        	firstname: 'Vincent',
			username: 'Vincent_tha_man',
			email: 'vincent@gmail.com',
			password: '123',
			about: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, voluptatibus quidem maiores. Fugit odit quam, quo adipisci voluptatem sint veniam id nulla necessitatibus sapiente omnis vitae tempora veritatis accusantium nemo dignissimos temporibus doloribus! Molestiae quibusdam, qui nemo debitis corporis officiis.`,
			profile: '/images/users/3.png'
		})
        .then((user) => {
            return user.createBlogpost({
            	type: 'Informative',
				title: 'Is baking paper toxic?',
				content: `It certainly helps keep mess at bay and stops delicious cookies from sticking to the pan, but does anybody really know what their baking paper is made of? Let me explain.\nSome of the older baking paper (or parchment paper) varieties are made by bathing sheets of paper pulp in sulfuric acid until it becomes gelatinous and slick. Does sulfuric acid sound dangerous to you? You’d be surprised to know that it’s actually one of the more natural ingredients you’ll come across… your body produces it every day! The science says it won’t hurt you in such small amounts.\nEven though the type made from sulfuric acid isn’t toxic, there are new brands of baking paper which use entirely different methods to achieve that stickless surface. Sarah Wilson explains in her new book, Simplicious: “Some are coated in quilon, a non-stick coating that becomes toxic when burned. Which might raise alarm bells for you. Better quality brands use silicone coating, which is safer.” So, next time you’re buying baking paper, keep a look out for quilon coating. Or, on the other hand, don’t use baking paper at all (solves the problem, eh?). Sarah is all for sustainable, reusable kitchenware…“ My concern is the disposability. I personally use washable silicone baking sheets, easily bought online. Treat yourself!”`,
				readlength: 2,
				posted: Date.now(),
				likes: 2,
				image: '/images/posts/2.png'
            })
	        .then( post => {
	        	model.Comment.create({
					content: `Omg, I've been using baking paper all my life...`,
					posted: Date.now(),
					userId: 2,
					blogpostId: post.id
	            })
	        })
	    })

        //create obama
		model.User.createUser({
			firstname: 'Obama',
			username: 'obaaams',
			email: 'obama@gmail.com',
			password: '123',
			about: `After working my way through college with the help of scholarships and student loans, I moved to Chicago, where I worked with a group of churches to help rebuild communities devastated by the closure of local steel plants. But, in my spare time (when I'm not busy presedenting) I love to cook!`,
			profile: '/images/users/4.png'
		})
        .then( user => {
			user.createBlogpost({
				type: 'Nothing in particular',
				title: 'A Beginner’s Guide to Once a Week Food Prep',
				content: `Last week I shared a post talking about prepping all of your food for the week in one afternoon (I also have a whole chapter dedicated to make-ahead meals in my popular ebook) I offered lots of tips, pictures, and gave a step by step on what my food prep day looks like. I received lots of positive feedback on this post. However, within those comments were statements like this: “That looks amazing, I wish I could do that”, “Wow, you are so organized, can you come to my house and do that for me?”, “I would love to food prep but don’t know where to start”, “I tried to prep my food and got so overwhelmed I quit”. These comments, and others like them, made me think. I want you (my reader) to read the posts I write and think to yourself “I can do this”. I do not want you to feel overwhelmed or that it’s too out of reach. BELIEVE ME if you knew me in “real life” you would say “Dang, if Tammy can do it then I can definitely do this”. Not kidding! Some of my closest friends wonder how I even tie my own shoelaces some days. But one of my favorite quotes is “It never gets easier, you only get better”. This is so true. The more I work at something the “easier” it gets. Not because the task itself got easier but because I got better. I evolved. The person I am today with food prep is not the person I was 4 years ago just starting out. If I were to give weekly food prep guidelines to the “just starting out” Tammy this is what they would be… DON'T TRY TO PREP IT AT ALL! First and foremost, when starting out, don’t try and make ahead your entire weekly menu plan. This will completely overwhelm you – it can still overwhelm me. Start slow. The first week prep 1 or 2 recipes ahead of time and as you get comfortable with the process you can prep more. DON'T TRY NEW RECIPES. When starting out with food prep it is best to stick with recipes you already know. This way you are confident in the outcome of the recipe and the only thing you need to focus on is preparing it ahead of time. This is the way I started with my food prep. I took recipes that I made often, like taco meat and red clam sauce, and prepared them ahead of time and then stored in the refrigerator and sometimes freezer. I was able to focus on what worked, what didn’t, and most importantly it allowed me to experience the benefits of having food ready. I know taco meat and clam sauce is easy to make but I still found having these meals made ahead of time to be extremely beneficial. Choose which recipe(s), if made ahead of time, would make the biggest difference in your week. This is huge! If you are short on time or don’t have the energy to prepare a lot of food then prioritize your meals. Which recipe, if made ahead of time, is going to make your week easier? If you are rushing around every morning and always running out of time for a healthy breakfast then maybe focus on preparing breakfast sandwiches or steel cut oats. If dinnertime brings you the most stress then put together some meal starters or prep ingredients for a couple slow cooker recipes. If you are always running to the vending machine at 3:00pm then put together some veggie packs or bags of almonds. What is going to make it easier for you to eat healthier during the week? When I was working out of the house having lunch prepared was huge. If I didn’t I was going to the vending machines or cafeteria for sure. You can view all my mason jar salad recipes here.`,
				readlength: 3,
				posted: Date.now(),
				likes: 1,
				image: '/images/posts/7.png'
			})

			return user.createBlogpost({
				type: '5 Easy ways',
				title: 'To make a delicious pokébowl',
				content: `Poke bowls might be unfamiliar to many family tables across the Lower 48, but now is the time to start incorporating these delicious and nutritional recipes into your regular weeknight home cooking. While it can seem intimidating to work with raw fish and ingredients that you’re not fully comfortable with, this is a great cooking skill that once you learn, you’ll never stop using. So take a dive out of your comfort zone for these deliciously authentic poke recipes. If you’d like, think of poke bowls like deconstructed sushi. And just like sushi, this “new” trend is actually an old traditional dish that dates back centuries. In Hawaii, where poke bowls originated, you can find the varieties everywhere from restaurants to supermarkets, and for good reason: They’re delicious, simple, and healthy. Poke is pronounced, poh-keh, and the word means “to cut.” This aggressive verb, however, describes a delicate dish of raw, fresh fish (think: ahi tuna, salmon or shellfish) that are marinated and served cold over rice. The rice and fish are then seasoned with sauces like soy sauce, ponzu sauce, limu (seaweed), rice vinegar, Hawaiian sea salt, creamy and spicy mayo, and salty furikake. All accompanying ingredients are sliced and diced in bite-size portions. In Hawaii, different variations of this dish are not difficult to come by. Take a trip to virtually any grocery store in the Aloha State and you’ll be greeted by a vast selection of the famous sushi-grade fish, like fresh tuna. Take a look through the butcher’s glass and you’ll see hi limu (yellowfin tuna with algae), spicy garlic salmon, tofu with soy sauce, sesame seeds, green onions, kimchee tako (octopus) for sale, and all prepared to top your poke bowls. Because in Hawaii, poke bowls are simple. `,
				readlength: 3,
				posted: Date.now(),
				likes: 8,
				image: '/images/posts/6.png'
			})
			.then( post => {
				model.Comment.create({
					content: `Pokebowls are so yummy, I can't get over them. Great hype this is. And so much cheaper than sushi!`,
					posted: Date.now(),
					userId: 1,
					blogpostId: post.id
				})
				.then( () => {
					model.Comment.create({
						content: `Totally agree, and so easy too! Great post Obama!`,
						posted: Date.now(),
						userId: 3,
						blogpostId: post.id
					})
				})
	        })
        })
    })
	.catch(e => console.error(e.stack));
}
