import React from "react";

const StepProgressBar = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { number: 1, title: "Connect Wallet", description: "Connect your wallet" },
    { number: 2, title: "Join Community", description: "Join Telegram channel" },
    { number: 3, title: "Claim Faucet", description: "Get your ETH" },
  ];

  return (
    <div className="step-progress-container">
      <div className="progress-bar">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="step-indicator">
              <div 
                className={`step-circle ${
                  currentStep >= step.number ? "active" : ""
                } ${currentStep > step.number ? "completed" : ""}`}
              >
                {currentStep > step.number ? (
                  <span className="checkmark">✓</span>
                ) : (
                  <span className="step-number">{step.number}</span>
                )}
              </div>
              <div className="step-info">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`connecting-line ${
                  currentStep > step.number ? "completed" : ""
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepProgressBar; 