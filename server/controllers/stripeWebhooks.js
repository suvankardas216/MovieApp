import stripe from 'stripe';
import Booking from '../models/Booking.js';

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook signature verification failed:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        // Handle event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const { bookingId } = session.metadata;

                if (bookingId) {
                    await Booking.findByIdAndUpdate(bookingId, {
                        isPaid: true,
                        paymentLink: "",
                    });
                    console.log(`Booking ${bookingId} marked as paid.`);
                }

                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error(`Error handling webhook: ${error.message}`);
        res.status(500).send(`Internal Server Error`);
    }
};
