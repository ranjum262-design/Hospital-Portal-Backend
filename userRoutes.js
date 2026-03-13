const express = require('express');
const router = express.Router();
const User = require('./User'); // Yahan galti thi, 'Topic' nahi 'User' hona chahiye

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password }); // 'User' model use ho raha hai

        if (user) {
            res.status(200).json({ 
                message: "Login successful", 
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role || 'patient'
                }
            });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
