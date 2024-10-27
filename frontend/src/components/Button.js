import React from 'react';

const Button = ({ file, onPress }) => {
   return (
      <div
         className={`p-0.5 rounded-xl ${
            !file
               ? 'bg-gradient-to-r from-red-800 to-orange-600'
               : 'bg-gradient-to-r from-blue-800 to-weird-yellow'
         }`}>
         <button
            type="button"
            onClick={onPress}
            disabled={!file} // Disable if no file is selected
            className={`w-full h-full px-4 py-2 font-mono rounded-xl shadow-xl ${
               !file
                  ? 'bg-gray-500 text-custom-red'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            }`}>
            Calculate Nutri Score
         </button>
      </div>
   );
};
export default Button;
