import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const navigate = useNavigate()

    return (
        <div className='relative h-screen'>
            {/* 🔹 Background Image Layer with Opacity */}
            <div className='absolute inset-0 bg-[url("https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/05/deadpool-wolverine-hugh-jackman-1.jpg")] bg-cover bg-center opacity-50 z-0'></div>

            {/* 🔹 Content Layer */}
            <div className='relative z-10 flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-full'>
                <img src={assets.marvelLogo} alt="" className='max-h-11 lg:h-11 mt-20' />

                <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110 text-white'>
                    Deadpool & Wolverine
                </h1>

                <div className='flex items-center gap-4 text-gray-300'>
                    <span>Action | Adventure | Comedy</span>
                    <div className='flex items-center gap-1'>
                        <CalendarIcon className='w-4.5 h-4.5' /> 2024
                    </div>
                    <div className='flex items-center gap-1'>
                        <ClockIcon className='w-4.5 h-4.5' /> 2h 8m
                    </div>
                </div>

                <p className='max-w-md text-gray-300'>
                    Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.
                </p>

                <button
                    onClick={() => { navigate('/movies') }}
                    className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
                >
                    Explore Movies
                    <ArrowRight className='w-5 h-5' />
                </button>
            </div>
        </div>
    )
}

export default HeroSection
