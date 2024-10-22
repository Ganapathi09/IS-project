const User = require('./models/User');
const sendVerificationEmail = require('../emailService');
const crypto = require('crypto');

exports.registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    const verificationCode = crypto.randomBytes(3).toString('hex');

    const user = new User({ username, password, email, verificationCode });

    try {
        await user.save();
        await sendVerificationEmail(email, verificationCode);
        res.status(201).json({ message: 'User registered. Verification email sent.' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user.' });
    }
};

exports.verifyEmail = async (req, res) => {
    const { username, code } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && user.verificationCode === code) {
            user.isVerified = true;
            user.verificationCode = undefined; // Clear the code
            await user.save();
            res.status(200).json({ message: 'Email verified successfully!' });
        } else {
            res.status(400).json({ message: 'Invalid code or user not found.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error verifying email.' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (user) {
            if (user.isVerified) {
                res.status(200).json({ message: 'Login successful!' });
            } else {
                res.status(403).json({ message: 'Email not verified.' });
            }
        } else {
            res.status(400).json({ message: 'Invalid credentials.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error logging in.' });
    }
};
