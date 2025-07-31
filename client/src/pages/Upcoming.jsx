"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const Upcoming = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming", {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_API_KEY,
                        language: "en-US",
                        page: 1,
                    },
                })
                setMovies(response.data.results)
            } catch (error) {
                console.error("Error fetching upcoming movies:", error)
            }
        }
        fetchUpcomingMovies()
    }, [])

    return (
        <div className="min-h-screen bg-black">
            {" "}
            {/* Ensure full height and black background */}
            <div className="max-w-6xl mx-auto p-6 pt-24">
                {" "}
                {/* Increased top padding to prevent overlap */}
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Upcoming Movies</h2>{" "}
                {/* Larger, centered heading */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {" "}
                    {/* Adjusted grid for more columns on larger screens */}
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-700/30 transition-all duration-300 overflow-hidden border border-gray-800 hover:border-purple-600/50 cursor-pointer"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-auto object-cover rounded-t-xl" // Ensure image covers and has top rounded corners
                            />
                            <div className="p-3 text-sm">
                                <p className="font-semibold text-white truncate">{movie.title}</p> {/* Truncate long titles */}
                                <p className="text-gray-400 text-xs mt-1">{movie.release_date}</p> {/* Lighter gray for date */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Upcoming
