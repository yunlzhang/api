let Picture = require('../lib/mongoose').Picture;

module.exports = {
	// 注册一个用户
	create: function create(data) {
		return Picture.create(data);
	},
	find: function (data) {
		let query = {};
		if (data.location != 'all' && data.time != 'all') {
			query = {
				location: {
					$regex: new RegExp(data.location)
				},
				time: {
					$regex: new RegExp(data.time)
				}
			}
		} else if (data.location == 'all' && data.time == 'all') {
			query = {}
		} else {
			query = {
				$or: [{
						location: {
							$regex: new RegExp(data.location)
						}
					},
					{
						time: {
							$regex: new RegExp(data.time)
						}
					}
				]
			}
		}
		return Picture.find(query)
			.sort({
				_id: -1
			})
			.skip(data.num * data.page ? data.num * (data.page - 1) : 0)
			.limit(Number(data.num) || 20)
			.lean();
	}
};
