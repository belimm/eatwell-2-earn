import React from 'react';

import {
   toUserFriendlyAddress,
   useTonConnectModal,
   useTonWallet,
} from '@tonconnect/ui-react';

const ConnectWalletButton = () => {
   const wallet = useTonWallet();
   const { open } = useTonConnectModal();

   if (!wallet) {
      return (
         <button
            onClick={open}
            className="px-6 py-2 mt-5 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 shadow-lg transition duration-300 ease-in-out">
            Connect Wallet
         </button>
      );
   }

   return (
      <div>
         <div>{wallet.device.appName}</div>
         <div>{toUserFriendlyAddress(wallet.account.address)}</div>
      </div>
   );
};

export default ConnectWalletButton;
