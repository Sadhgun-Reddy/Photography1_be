import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Admin Login
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists (in a real app, you'd seed the first admin)
        // For this example, if no users exist, we create the admin on first login attempt with 'admin' / 'password'
        const userCount = await User.countDocuments();
        if (userCount === 0 && username === 'admin' && password === 'admin123') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.create({ username, password: hashedPassword });
        }

        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'super_secret_key_change_me_in_production',
            { expiresIn: '30d' }
        );

        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/auth/verify
// @desc    Verify Token
// @access  Private
router.get('/verify', protect, (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
});

export default router;
