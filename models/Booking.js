import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
