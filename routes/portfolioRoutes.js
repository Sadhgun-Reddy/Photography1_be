import express from 'express';
import Portfolio from '../models/Portfolio.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get all portfolio items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const items = await Portfolio.find({}).sort({ order: 1, createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/portfolio
// @desc    Create new portfolio item
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
    try {
        const item = await Portfolio.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
});

// @route   DELETE /api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
    try {
        const item = await Portfolio.findById(req.params.id);

        if (item) {
            // Logic to delete from cloudinary would go here
            await item.deleteOne();
            res.json({ message: 'Item removed' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
