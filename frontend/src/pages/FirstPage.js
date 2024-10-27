import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '../components/Button';
import Input from '../components/Input';
import ConnectWalletButton from '../components/ConnectWalletButton';

import LoadingSpinner from '../components/LoadingSpinner';

const FirstPage = () => {
   const [isFetching, setIsFetching] = useState(false);
   const [loadedAnimation, setLoadedAnimation] = useState(false); // State to manage load animation

   const [file, setFile] = useState(null);
   const [walletAddress, setWalletAddress] = useState(null);
   const [response, setResponse] = useState({});

   useEffect(() => {
      // Trigger the animation class after component mounts
      setTimeout(() => setLoadedAnimation(true), 500); // Delay to make sure component is mounted
   }, []);

   // Handle file selection
   const handleFileChange = (event) => {
      setFile(event.target.files[0]);
   };

   // Handle file upload to the API
   const handleUpload = async () => {
      if (!file) return; // Exit if no file is selected
      setIsFetching(true);
      const formData = new FormData();
      formData.append('image', file); // Add the selected file to the form data

      try {
         const res = await axios.post(process.env.REACT_APP_BE_URL, formData, {
            headers: {
               'Content-Type': 'multipart/form-data', // Set the content type
            },
         });

         console.log('Server Response:', res);

         // Destructure the data from response
         const { foodLabelsFiltered, nutriScore } = res.data;

         // Update the state with the response data
         setResponse({
            foodLabelsFiltered,
            nutriScore,
         });
      } catch (error) {
         console.error('Error uploading file:', error);
      } finally {
         setIsFetching(false);
      }
   };

   const RenderHeaderText = () => {
      return (
         <h1 className="text-2xl font-bold mb-20 font-mono text-transparent bg-clip-text bg-gradient-to-r from-light-purple to-dark-blue hover:to-pink-500 hover:from-purple-500 hover:to-pink- transition-all duration-400">
            Eat 2 Well Earn
         </h1>
      );
   };

   const RenderInputContainer = () => {
      return (
         <div className="mb-20">
            <div className="flex flex-col items-center mb-20 p-0.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 shadow-xl">
               <div className="flex flex-col items-center p-10 w-full h-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <Input onPress={handleFileChange} file={file} />
               </div>
            </div>
            <Button file={file} onPress={handleUpload} />
         </div>
      );
   };

   const RenderNutriScoreDetails = () => {
      if (!response.nutriScore) return null; // Render nothing if nutriScore is not set

      const getScoreColor = (score) => {
         if (score <= 2.5) return 'text-red-500';
         if (score <= 5) return 'text-orange-500';
         if (score <= 7.5) return 'text-yellow-500';
         return 'text-green-500';
      };

      return (
         <div className="flex justify-center mb-20">
            <div className="p-0.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 shadow-xl">
               <div className="bg-white py-10 px-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono">
                  <h2 className="text-xl font-semibold mb-5">
                     Analysis Result:
                  </h2>
                  <p className="mb-5">
                     <strong>Nutri Score:</strong>{' '}
                     <span
                        className={`font-bold ${getScoreColor(
                           response.nutriScore
                        )}`}>
                        {response.nutriScore}
                     </span>
                  </p>
                  <p>
                     <strong>Possible Food Labels:</strong>
                  </p>
                  <ul className="list-disc pl-6 py-10">
                     {response.foodLabelsFiltered.map((label, index) => (
                        <li className="mb-5" key={index}>
                           {label}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      );
   };

   if (isFetching) return <LoadingSpinner />;

   return (
      <div
         className={` transform transition-opacity duration-1000 ease-in-out ${
            loadedAnimation
               ? 'opacity-100 translate-y-0'
               : 'opacity-0 translate-y-10'
         }`}>
         {/* Connect Wallet Button Positioned in the Top Right Corner */}
         <div className="absolute top-4 right-4 font-mono">
            <ConnectWalletButton
               walletAddress={walletAddress}
               setWalletAddress={setWalletAddress}
            />
         </div>

         <div className="my-40 flex flex-col items-center min-h-screen">
            {/* Page Content */}
            <RenderHeaderText />
            <RenderInputContainer />
            <RenderNutriScoreDetails />
         </div>
      </div>
   );
};

export default FirstPage;
