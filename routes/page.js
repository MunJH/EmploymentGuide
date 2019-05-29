const express = require('express');
const router = express.Router();
const fs = require('fs');
const con = require('../db/db');

router.get('/', (req, res, next) => {
	fs.readFile('front/index.html', (err, data) => {
		if (err) {
			console.log(err);
			next(err);
		}
		res.end(data);
	});
});

module.exports = router;
