import express from 'express';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create new booking inquiry
// @access  Public
router.post('/', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        // Here you would also trigger Nodemailer to send emails
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: 'Invalid booking data', error: error.message });
    }
});

// @route   GET /api/bookings
// @desc    Get all bookings
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private/Admin
router.put('/:id/status', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.id);

        if (booking) {
            booking.status = status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
