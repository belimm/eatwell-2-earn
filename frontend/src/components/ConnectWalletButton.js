import React from 'react';
import { TonConnect } from '@tonconnect/sdk';

const ConnectWalletButton = ({ walletAddress, setWalletAddress }) => {
   const tonConnect = new TonConnect();

   const connectWallet = async () => {
      try {
         await tonConnect.connect();
         const address = tonConnect.wallet.getAddress();
         setWalletAddress(address);
         alert(`Connected to wallet: ${address}`);
      } catch (error) {
         console.error('Error connecting to wallet:', error);
      }
   };

   return (
      <button
         onClick={connectWallet}
         className="px-6 py-2 mt-5 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 shadow-lg transition duration-300 ease-in-out">
         {walletAddress
            ? `Connected: ${walletAddress}`
            : 'Connect Wallet to $TON'}
      </button>
   );
};

export default ConnectWalletButton;
