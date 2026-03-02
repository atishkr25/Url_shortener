const express = require('express');
const URL = require('../models/url');
const router = express.Router();

// SSR(server side rendering) route to render home page with all URLs
router.get('/', async (req, res) => {
    try {
        const allURL = await URL.find({});
        res.render('home', { allURL, id: null });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/signup', (req, res) => {
    return res.render("signup");
})
router.get('/login', (req, res) => {
    return res.render("login");
})


module.exports = router;
