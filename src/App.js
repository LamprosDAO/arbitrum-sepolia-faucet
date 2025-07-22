import "./App.css";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import "./styles/Steps.css";
import { useAccount } from "wagmi";
import StepProgressBar from "./components/StepProgressBar";
import WalletStep from "./components/WalletStep";
import TelegramStep from "./components/TelegramStep";
import FaucetStep from "./components/FaucetStep";
import lamprosdao from "./asset/images/lampros-dao.png";

function App() {
  const { address } = useAccount();
  const [addressInput, setAddressInput] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasJoinedTelegram, setHasJoinedTelegram] = useState(false);
  const [addressWarning, setAddressWarning] = useState("");
  
  const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

  // Determine recipient address and validation
  const recipientAddress = address || (addressInput && ethereumAddressRegex.test(addressInput) ? addressInput : "");
  const hasValidAddress = recipientAddress && ethereumAddressRegex.test(recipientAddress);

  // Handle address validation warnings
  useEffect(() => {
    if (address) {
      setAddressWarning("");
    } else if (addressInput && !ethereumAddressRegex.test(addressInput)) {
      setAddressWarning("Please enter a valid Ethereum address");
    } else if (addressInput && ethereumAddressRegex.test(addressInput)) {
      setAddressWarning("");
    }
  }, [address, addressInput]);

  // Auto-advance from wallet step when address is connected
  useEffect(() => {
    if (currentStep === 1 && hasValidAddress) {
      // Small delay to show success message before auto-advancing
      const timer = setTimeout(() => {
        if (currentStep === 1) {
          setCurrentStep(2);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasValidAddress, currentStep]);

  const handleNext = () => {
    if (currentStep === 1 && !hasValidAddress) {
      setAddressWarning("Please connect your wallet or enter a valid address");
      return;
    }
    if (currentStep === 2 && !hasJoinedTelegram) {
      return; // User must join telegram first
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WalletStep
            addressInput={addressInput}
            setAddressInput={setAddressInput}
            addressWarning={addressWarning}
            hasValidAddress={hasValidAddress}
            recipientAddress={recipientAddress}
          />
        );
      case 2:
        return (
          <TelegramStep
            hasJoinedTelegram={hasJoinedTelegram}
            setHasJoinedTelegram={setHasJoinedTelegram}
          />
        );
      case 3:
        return (
          <FaucetStep
            recipientAddress={recipientAddress}
            setShowConfetti={setShowConfetti}
            showConfetti={showConfetti}
            hasJoinedTelegram={hasJoinedTelegram}
            hasValidAddress={hasValidAddress}
          />
        );
      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    if (currentStep === 1) return hasValidAddress;
    if (currentStep === 2) return hasJoinedTelegram;
    return false;
  };

  return (
    <div className="App">
      <nav className="navbar">
        <img src={lamprosdao} alt="Lampros DAO" className="navbar-logo" />
        <span className="navbar-title">Arbitrum Sepolia Faucet</span>
      </nav>
      
      <div className="main_container">
        <div className="card_container">
          <div className="stepper-container">
            <StepProgressBar currentStep={currentStep} />
            
            <div className="step-content-container">
              {renderCurrentStep()}
            </div>

            <div className="button-container">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`step-nav-btn previous ${currentStep === 1 ? 'disabled' : ''}`}
              >
                ← Previous
              </button>
              
              <div className="step-indicator-mobile">
                Step {currentStep} of 3
              </div>
              
              <button
                onClick={handleNext}
                disabled={currentStep === 3 || !canProceedToNext()}
                className={`step-nav-btn next ${currentStep === 3 || !canProceedToNext() ? 'disabled' : ''}`}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showConfetti && (
        <div className="confetti-overlay">
          <Confetti 
            width={window.innerWidth} 
            height={window.innerHeight}
            numberOfPieces={200}
            recycle={false}
            run={true}
          />
        </div>
      )}
      
      <div className="footer">
        <span>
          Donate ETH with ❤️ to : 0x5bc6f16Ca189D3C8d3Fbaf367611fB04a0B7b309
        </span>
        <div className="social-media">
          <svg
            viewBox="0,0,256,256"
            width="50px"
            height="50px"
            onClick={() => window.open("https://x.com/lamprosdao")}
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"></path>
              </g>
            </g>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 127.14 96.36"
            onClick={() => window.open("https://discord.gg/KrjR44f2")}
          >
            <path
              fill="#fff"
              d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
