const express = require('express');
const router = express.Router();
const Topic = require('./Topic');

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
    try {
        // Naye user ko save karte waqt default role 'patient' hi jayega
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// LOGIN ROUTE (Fixed Version)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (user) {
            // ✅ Sahi Response: Sirf ek baar bhejna hai
            // fullName aur role dono bhej rahe hain taaki frontend use kar sake
            res.status(200).json({ 
                message: "Login successful", 
                user: {
                    id: user._id,
                    fullName: user.fullName, // Screenshot ke hisab se fullName use karein
                    email: user.email,
                    role: user.role || 'patient' // Agar role nahi hai toh 'patient' man lo
                }
            });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE STATUS ROUTE
router.put('/update-status/:userId/:topicId', async (req, res) => {
    try {
        const { userId, topicId } = req.params;
        const { status } = req.body;
        res.status(200).json({ message: "Status updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
