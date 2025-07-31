import axios from "axios"

// Helper to get address from Google Maps API (already present, but ensuring it's here)
const getAddressFromGoogle = async (lat, lon) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY // Store this in your .env
        if (!apiKey) {
            console.error("GOOGLE_MAPS_API_KEY is not set in environment variables.")
            return "Unknown address"
        }
        const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                latlng: `${lat},${lon}`,
                key: apiKey,
            },
        })
        const result = res.data.results?.[0]
        return result ? result.formatted_address : "Unknown address"
    } catch (error) {
        console.error("Google Maps API error (getAddressFromGoogle):", error.message)
        return "Unknown address"
    }
}

export const getTheatresByCity = async (req, res) => {
    const { city } = req.query
    if (!city || typeof city !== "string") {
        return res.status(400).json({ error: "City is required" })
    }

    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY
        if (!apiKey) {
            console.error("GOOGLE_MAPS_API_KEY is not set in environment variables.")
            return res.status(500).json({ error: "Server configuration error: API key missing." })
        }

        // Step 1: Get city coordinates using Google Geocoding API
        const geocodeRes = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: city,
                key: apiKey,
            },
        })

        if (!geocodeRes.data.results || geocodeRes.data.results.length === 0) {
            return res.status(404).json({ error: "City not found via Google Geocoding." })
        }

        const { lat, lng } = geocodeRes.data.results[0].geometry.location
        console.log(`📍 Found coordinates for ${city}: Lat ${lat}, Lng ${lng}`)

        // Step 2: Search for cinemas using Google Places API (Text Search)
        const placesRes = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
            params: {
                query: `cinema in ${city}`, // Search query
                location: `${lat},${lng}`, // Center of the search
                radius: 50000, // Search within a 50km radius (adjust as needed)
                type: "movie_theater", // Specific type for movie theaters
                key: apiKey,
            },
        })

        if (!placesRes.data.results || placesRes.data.results.length === 0) {
            return res.status(200).json([]) // Return empty array if no theatres found
        }

        // Step 3: Format the results
        const theatres = placesRes.data.results.map((place) => ({
            id: place.place_id, // Use Google's place_id as a unique identifier
            name: place.name,
            address: place.formatted_address,
            // You can add more fields if needed, e.g., place.rating, place.photos
        }))

        console.log(`✅ Found ${theatres.length} theatres in ${city} using Google Places API.`)
        res.status(200).json(theatres)
    } catch (err) {
        console.error("Google Maps API error (getTheatresByCity):", err.message)
        // Log the full error response from Google if available
        if (err.response) {
            console.error("Google API Response Data:", err.response.data)
            console.error("Google API Response Status:", err.response.status)
        }
        res.status(500).json({ error: "Failed to fetch theatre data from Google Maps." })
    }
}
