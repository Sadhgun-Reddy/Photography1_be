import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Weddings', 'Fashion', 'Events', 'Commercial'],
        required: true,
    },
    date: {
        type: String, // Format like "Sep 2023"
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    publicId: {
        type: String, // For Cloudinary asset management
        required: true,
    },
    heightClass: {
        type: String,
        default: 'h-[500px]', // For masonry grid sizing
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
