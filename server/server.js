import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
console.log("✅ GOOGLE_MAPS_API_KEY =", process.env.GOOGLE_MAPS_API_KEY)

import connectDB from "./configs/db.js"
import { clerkMiddleware } from "@clerk/express"
import { serve } from "inngest/express"
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import userRouter from "./routes/userRoutes.js"
import { stripeWebhooks } from "./controllers/stripeWebhooks.js"
import theatreRoutes from "./routes/theatreRoutes.js"

console.log("✅ Imported theatreRoutes.js")

const app = express()
const port = 3000

await connectDB()

// CORS middleware should come BEFORE your routes
const allowedOrigins = [
    "http://localhost:5173",
    "https://movieapp-two-self.vercel.app", // ✅ your deployed frontend
]

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like curl, mobile apps, Inngest)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS: " + origin))
            }
        },
        credentials: true,
    }),
)


// Body parsing middleware
app.use(express.json())

// Clerk middleware
app.use(clerkMiddleware())

// Stripe webhooks route (needs raw body, so it comes before express.json())
app.use("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks)

// Basic route
app.get("/", (req, res) => {
    res.send("Hello World!")
})

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }))

// API routes (these now have CORS applied)
app.use("/api/theatres", theatreRoutes)
app.use("/api/show", showRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)

console.log("🧠 Available routes initialized.")

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
