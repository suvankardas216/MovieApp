import mongoose from 'mongoose'

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    screens: {
        type: Number,
        default: 1
    },
    timings: [String], // e.g., ["10:00 AM", "1:00 PM"]
}, {
    timestamps: true
})

export default mongoose.model('Theatre', theatreSchema)
