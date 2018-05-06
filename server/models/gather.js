let Gather = require('../lib/mongoose').Gather;

module.exports = {
	create: function create(data) {
		return Gather.create(data);
	},
	get:function(){
		return Gather
		.findOne({})
		.populate({
			path:'photos',
			options:{
				sort:{_id:-1},
				limit:20
			}
		}).lean();
	},
	update: function (data) {
		return Gather.update({}, {
			$addToSet: {
				photos: {
					$each: data.photos
				},
				locations:data.location,
				times:data.time
			},
			$inc:{
				photos_count:data.photos.length
			}
		});
	}
};
