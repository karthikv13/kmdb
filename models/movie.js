var mongoose = require('mongoose');
var movie = new mongoose.Schema({
	name: String,
	director: String,
	cast:[type: String],
	length: Number,
	rating: Number
});
module.exports = mongoose.model('Movie',movie);