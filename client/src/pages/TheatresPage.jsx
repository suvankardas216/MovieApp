"use client"

import { useState } from "react"
import axios from "axios"

const TheatresPage = () => {
    const [city, setCity] = useState("")
    const [searchCity, setSearchCity] = useState("")
    const [theatres, setTheatres] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchCity.trim()) return

        setLoading(true)
        setError(null)
        setHasSearched(true)

        try {
            console.log(`🔍 Searching for theatres in: ${searchCity.trim()}`)

            // API call remains unchanged
            const res = await axios.get(`http://localhost:3000/api/theatres`, {
                params: {
                    city: searchCity.trim(),
                },
            })

            console.log(`✅ Found ${res.data.length} theatres:`, res.data)
            setTheatres(res.data)
            setCity(searchCity.trim())
        } catch (err) {
            console.error("❌ Error fetching theatres:", err)

            if (err.response) {
                // If the backend sent a specific error message
                if (err.response.data && err.response.data.error) {
                    setError(`Backend Error: ${err.response.data.error}`)
                } else if (err.response.status === 400) {
                    setError("Invalid city name provided. Please try again.")
                } else if (err.response.status === 404) {
                    setError("City not found or no theatres in this city.")
                } else if (err.response.status === 500) {
                    setError("Server error. Please try again later.")
                } else {
                    setError("An unexpected error occurred. Please try again.")
                }
            } else if (err.request) {
                // The request was made but no response was received
                setError("Network Error: Could not connect to the server. Please check your connection.")
            } else {
                // Something happened in setting up the request that triggered an Error
                setError("Request setup error. Please try again.")
            }
            setTheatres([])
        } finally {
            setLoading(false)
        }
    }

    const handleCityChange = (e) => {
        setSearchCity(e.target.value)
        if (!e.target.value.trim()) {
            setHasSearched(false)
            setTheatres([])
            setCity("")
            setError(null)
        }
    }

    return (
        <div className="min-h-screen bg-black">
            {" "}
            {/* Changed background to solid black */}
            <div className="max-w-6xl mx-auto p-6 pt-24">
                {" "}
                {/* Increased top padding to push content down */}
                {/* Search Form */}
                <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-900/20 mb-8 p-6 border border-gray-800">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="flex-1 relative">
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)"
                                value={searchCity}
                                onChange={handleCityChange}
                                className="w-full pl-10 pr-4 py-3 text-lg bg-gray-800/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-200"
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !searchCity.trim()}
                            className="px-8 py-3 text-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    Search
                                </>
                            )}
                        </button>
                    </form>
                </div>
                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 animate-spin text-purple-500 mb-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <p className="text-lg text-gray-300">Searching for theatres in {searchCity}...</p>
                    </div>
                )}
                {/* Error State */}
                {error && ( // Error State
                    <div className="bg-red-900/40 border border-red-800 rounded-xl p-6 mb-8 backdrop-blur-sm shadow-lg shadow-red-900/20">
                        <div className="flex items-center justify-center gap-2">
                            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-red-300 text-center text-lg">{error}</p>
                        </div>
                    </div>
                )}
                {/* Results */}
                {!loading && hasSearched && !error && (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-white mb-2">Theatres in {city}</h2>
                            <p className="text-gray-300">
                                Found {theatres.length} theatre{theatres.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        {theatres.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {theatres.map((theatre) => (
                                    <div // Theatre Card
                                        key={theatre.id} // Use Google Place ID as key
                                        className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-700/30 transition-all duration-300 overflow-hidden border border-gray-800 hover:border-purple-600/50"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start gap-3 mb-4">
                                                <svg
                                                    className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <h3 className="text-xl font-bold text-white leading-tight">{theatre.name}</h3>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-start gap-2">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    <p className="text-gray-300 text-sm leading-relaxed">{theatre.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-900/20 text-center py-12 border border-gray-800">
                                <svg
                                    className="mx-auto h-16 w-16 text-purple-400 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <h3 className="text-xl font-semibold text-white mb-2">No theatres found</h3>
                                <p className="text-gray-300 mb-4">
                                    We couldn't find any theatres in {city}. Try searching for a different city.
                                </p>
                                <button
                                    className="px-6 py-2 border border-purple-600 text-purple-300 rounded-xl hover:bg-purple-900/30 transition-all duration-200"
                                    onClick={() => {
                                        setSearchCity("")
                                        setHasSearched(false)
                                        setCity("")
                                    }}
                                >
                                    Search Again
                                </button>
                            </div>
                        )}
                    </>
                )}
                {/* Initial State */}
                {!hasSearched &&
                    !loading && ( // Initial State
                        <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-900/20 text-center py-16 border border-gray-800">
                            <svg
                                className="mx-auto h-16 w-16 text-purple-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-white mb-2">Ready to find theatres?</h3>
                            <p className="text-gray-300">Enter a city name above to discover nearby movie theatres</p>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default TheatresPage
