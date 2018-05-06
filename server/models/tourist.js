let Tourist = require('../lib/mongoose').Tourist;

module.exports = {
    create: function create(data) {
      return Tourist.create(data);
    }	
};
