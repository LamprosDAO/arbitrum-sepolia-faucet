import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const WalletStep = ({ 
  addressInput, 
  setAddressInput, 
  addressWarning, 
  hasValidAddress, 
  recipientAddress 
}) => {
  const { address } = useAccount();
  
  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Connect Your Wallet</h2>
        <p className="step-subtitle">
          Connect your wallet or enter your Ethereum address to receive 0.01 ETH every 24 hours on Arbitrum Sepolia.
        </p>
      </div>

      <div className="wallet-connection-content">
        <div className="connect-btn-wallet-div">
          <ConnectButton />
        </div>
        
        <div className="or-divider">
          <span>OR</span>
        </div>
        
        <div className="wallet-address-div">
          <input
            type="text"
            value={addressInput || ""}
            placeholder="Enter your Ethereum address manually"
            onChange={(e) => setAddressInput(e.target.value)}
          />
        </div>
        
        {addressWarning && (
          <p className="error_msg">{addressWarning}</p>
        )}
        
        {hasValidAddress && (
          <div className="success-indicator">
            <p className="success_msg">
              ✓ Ready to claim to: {recipientAddress.slice(0, 10)}...{recipientAddress.slice(-8)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletStep; 