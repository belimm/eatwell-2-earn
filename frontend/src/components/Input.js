import React from 'react';

const Input = ({onPress, file}) => {
   
    return (
       <>
          <label
             htmlFor="file-upload"
             className="cursor-pointer px-4 py-2 border-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-mono rounded-lg hover:bg-gray-200 transition duration-300">
             Choose File
          </label>

          <input
             id="file-upload"
             type="file"
             onChange={onPress}
             className="hidden"
          />

          {/* Display the chosen file name or default text */}
          <p className="mt-5 font-mono text-l ">
             {file ? file.name : 'No file chosen'}
          </p>
       </>
    );
};

export default Input;
