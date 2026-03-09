const express = require('express');
const URL = require('../models/url');
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url")
const router = express.Router();
const { checkAuth } = require('../middleware/auth.middleware');

router.post('/', checkAuth, handleGenerateNewShortURL)
router.get('/', async (req, res) => {
	const allURL = await URL.find({});
	res.render('home', { allURL, id: null });
});
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;