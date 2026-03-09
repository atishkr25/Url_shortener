const User = require('../models/user');
const jwt = require('jsonwebtoken');


async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
        return res.status(400).render('signup', { error: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).render('signup', { error: 'Email already registered. Please login.' });
        }

        await User.create({ name, email, password });

        // Redirect to home after successful signup
        return res.redirect('/');
    } catch (error) {
        console.error('Signup error:', error.message);
        return res.status(500).render('signup', { error: 'Something went wrong. Please try again.' });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).render('login', { error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).render('login', { error: 'Invalid email or password.' });
        }
        const token = jwt.sign(
            {id: user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );
        res.cookie('token', token, {httpOnly: true});
        return res.redirect('/');
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).render('login', { error: 'Something went wrong. Please try again.' });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}