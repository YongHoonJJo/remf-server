
'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('Message', new mongoose.Schema({
	id: {
		type    : String,
		index   : true,
		unique  : true,
		required: true,
		dropDups: true
	},
	from: {
		type    : mongoose.Schema.Types.ObjectId,
		ref     : 'User',
		index   : true,
		required: true
	},
	to: [{
		type    : mongoose.Schema.Types.ObjectId,
		ref     : 'User',
		index   : true,
		required: true
	}],
	title: {
		type    : String,
		required: true
	},
	contentCount: {
		type    : Number,
		required: true
	},
	createdAt: {
		type    : Date,
		default : Date.now,
		index   : true,
		required: true
	}
}));