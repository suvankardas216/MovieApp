// src/components/LoadingScreen.jsx
import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <div className="text-white text-2xl font-semibold animate-pulse">
                🎬 The Movie App...
            </div>
        </div>
    );
};

export default LoadingScreen;
