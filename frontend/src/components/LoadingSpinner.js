import React from 'react';

const LoadingSpinner = () => (
   <div className="flex items-center justify-center h-screen">
      <div className="relative w-10 h-10">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-60 rounded-full animate-bounce1"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-60 rounded-full animate-bounce2"></div>
      </div>
   </div>
);

export default LoadingSpinner;
