
'use strict';

const express             = require('express');
const expressAsyncHandler = require('express-async-handler');
const fs                  = require('fs');
const path                = require('path');

const contentHandler = require('./content-handler');
const logger         = require('../logger');
const sessionHandler = require('./session-handler');
const storageSetting = require('../storage-setting');

const router = express.Router();

router.get('/:contentId', sessionHandler, contentHandler, expressAsyncHandler(async (req, res) => {
	res.status(200).
		header('Content-Type', req.content.type).
		header('Content-Length', req.content.size).
		header('Content-Disposition', `attachment; filename="${req.content.filename}"`);

	fs.createReadStream(path.join(storageSetting.storageRootPath, req.content.id)).pipe(res).on('error', err => {
		logger.error(`An error occurred while piping the content '${req.content.id}' :\n${err}`);
		res.end();
	});
}));

module.exports = router;