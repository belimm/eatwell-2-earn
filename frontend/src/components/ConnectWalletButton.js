import React, { useState } from 'react';
import {
   toUserFriendlyAddress,
   useTonConnectModal,
   useTonWallet,
} from '@tonconnect/ui-react';

const ConnectWalletButton = () => {
   const wallet = useTonWallet();
   const { open } = useTonConnectModal();
   const [isExpanded, setIsExpanded] = useState(false); // State to toggle address display

   if (!wallet) {
      return (
         <button
            onClick={open}
            className="px-6 py-2 mt-5 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 shadow-lg transition duration-300 ease-in-out">
            Connect Wallet
         </button>
      );
   }

   // Convert the full address to a user-friendly format
   const fullAddress = toUserFriendlyAddress(wallet.account.address);
   // Shorten the user-friendly address for display
   const shortAddress = `${fullAddress.slice(0, 4)}...${fullAddress.slice(-4)}`;
   const displayAddress = isExpanded ? fullAddress : shortAddress;

   // Toggle address display when clicked
   const toggleAddressDisplay = () => {
      setIsExpanded(!isExpanded);
   };

   return (
      <div
         onClick={toggleAddressDisplay}
         className="cursor-pointer px-4 py-2 bg-gray-900 text-white rounded-full shadow-md flex items-center space-x-2 shadow-xl border-2">
         <span>{displayAddress}</span>
         <span
            className={`text-xs transform transition-transform ${
               isExpanded ? 'rotate-180' : ''
            }`}>
            ▼
         </span>{' '}
         {/* Rotates the icon when expanded */}
      </div>
   );
};

export default ConnectWalletButton;
