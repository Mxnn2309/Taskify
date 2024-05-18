const jwt = require('jsonwebtoken');  // Ensure this is imported
const User = require('../models/UserModel');

const getUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });

        res.status(200).json({ email: user.email, token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getUser };
