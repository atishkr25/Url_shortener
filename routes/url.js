const express = require('express');
const URL = require('../models/url');
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url")
const router = express.Router();
const { checkAuth } = require('../middleware/auth.middleware');
const QRCode = require('qrcode');

router.post('/', checkAuth, handleGenerateNewShortURL)
router.get('/', async (req, res) => {
	const allURL = await URL.find({});
	res.render('home', { allURL, id: null, error: req.query.error || null, user: null });
});
router.get('/analytics/:shortId', handleGetAnalytics)

router.get('/qr/:shortId', async (req, res) => {
	const shortId = req.params.shortId;
	const baseUrl = process.env.BASE_URL || 'http://localhost:8002';

	try {
		const qrBuffer = await QRCode.toBuffer(`${baseUrl}/${shortId}`);
		res.setHeader('Content-Type', 'image/png');
		return res.send(qrBuffer);
	} catch (error) {
		console.error('QR generation failed:', error.message);
		return res.status(500).send('Failed to generate QR code');
	}
})

module.exports = router;