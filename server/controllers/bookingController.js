import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe from "stripe";

// check available seats
const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {
        const bookings = await Booking.find({ show: showId });
        const occupiedSeats = bookings.flatMap(booking => booking.bookedSeats);

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats.includes(seat));
        return !isAnySeatTaken;
    } catch (error) {
        console.error("Error checking seat availability:", error.message);
        return false;
    }
};


export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body;
        const { origin } = req.headers;

        //check if seat is available for this selected show
        const isSeatAvailable = await checkSeatsAvailability(showId, selectedSeats);

        if (!isSeatAvailable) {
            return res.json({ success: false, message: 'Selected seats are already booked.' });
        }

        // get show details
        const showData = await Show.findById(showId).populate('movie');

        // create a new booking 
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        })

        //Stripe Gateway
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        // line items for stripe
        const line_items = [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: showData.movie.title,
                },
                unit_amount: Math.floor(booking.amount) * 100
            },
            quantity: 1
        }]
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString(),
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
        })

        booking.paymentLink = session.url;
        await booking.save();

        //running inngest scheduler to check for payment in 10 minutes
        await inngest.send({
            name: 'app/checkpayment',
            data: {
                bookingId: booking._id.toString(),
            }
        })

        res.json({ success: true, url: session.url });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;

        const bookings = await Booking.find({ show: showId });
        const occupiedSeats = bookings.flatMap(booking => booking.bookedSeats);

        res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.error("Error fetching occupied seats:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch occupied seats." });
    }
}


