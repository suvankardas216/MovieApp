import { Inngest } from "inngest";
import User from "../models/User.js";
import connectDB from "../configs/db.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Ingest function to save user data to database
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },

    async ({ event }) => {
        await connectDB();
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            image: image_url
        }
        await User.create(userData);
    }
)

// Ingest function delete user data to database
const syncUserDeletion = inngest.createFunction(

    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },

    async ({ event }) => {
        await connectDB();
        const { id } = event.data;
        await User.findByIdAndDelete(id);
    }
)

// Ingest function to update user data to database
const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },

    async ({ event }) => {
        await connectDB();
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            image: image_url
        }
        await User.findByIdAndUpdate(id, userData);
    }
)

export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];