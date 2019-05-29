const express = require('express');
const router = express.Router();
const fs = require('fs');
const con = require('../db/db');

router.get('/', (req, res, next) => {
	fs.readFile('views/index.html', (err, data) => {
		if (err) {
			console.log(err);
			next(err);
		}
		res.end(data);
	});
});

router.get('/cplist', (req, res, next) => {
	var job = req.param('job');
	var q = "SELECT COMPANY_NAME, INTRODUCTION, FOUNDATION, BUSINESS, SALES, EMP_NUM, ANNUAL_INCOME, LOCATION, TEL, HOMEPAGE FROM JOB_HAS_COMPANY CJ, COMPANY C, JOB J WHERE CJ.COMPANY_ID = C.COMPANY_ID AND CJ.JOB_ID = J.JOB_ID AND J.JOB_NAME = '"+job+"'";

	con.query(q, function (err, result, fields) {
			res.render('inform.ejs', {
				company : result,
				job : job
		});
	});
});

router.get('/cpfield', (req, res, next) => {
	var job = req.param('job');
	var q1 = "SELECT certificate_NAME FROM job_has_certificate JC, CERTIFICATE C, JOB J WHERE JC.CERTIFICATE_ID = C.CERTIFICATE_id AND JC.JOB_ID = J.JOB_ID AND J.JOB_NAME = '"+job+"'";
	var q2= "SELECT language_name FROM job_has_language JL, language L, JOB J WHERE JL.language_id = L.language_id AND JL.JOB_ID = J.JOB_ID AND J.JOB_NAME = '"+job+"'";
	var q3 = "SELECT community_name, site FROM job_has_community JC, community C, JOB J WHERE JC.community_id = C.community_id AND JC.JOB_ID = J.JOB_ID AND J.JOB_NAME = '"+job+"'";
	con.query(q1, function (err, result, fields) {
		certifi = result;
		con.query(q2, function (err, result, fields) {
			lang = result;
			con.query(q3, function (err, result, fields) {
				com = result;
				res.render('certification.ejs', {
					certification : certifi,
					language : lang,
					community : com
				});
			});
		});
	});
});

module.exports = router;
