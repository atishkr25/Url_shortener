const express = require('express');
const URL = require('../models/url');
const router = express.Router();

// SSR route to render home page with all URLs
router.get('/', async (req, res) => {
    try {
        const allURL = await URL.find({});
        res.render('home', { allURL, id: null });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
