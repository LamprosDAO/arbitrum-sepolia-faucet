import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import ReCAPTCHA from "react-google-recaptcha";
import DiscordService from "../services/DiscordService";

const FaucetStep = ({ 
  recipientAddress, 
  setShowConfetti, 
  showConfetti,
  hasJoinedTelegram,
  hasValidAddress 
}) => {
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLowBalanceMsg, setLowBalanceMsg] = useState(true);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef(null);

  const { Send } = DiscordService();
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_SITE_KEY;

  useEffect(() => {
    const MAIN_ADDRESS = "0x5bc6f16Ca189D3C8d3Fbaf367611fB04a0B7b309";
    const provider = new ethers.providers.JsonRpcProvider(
      "https://sepolia-rollup.arbitrum.io/rpc"
    );
    
    const fetchBalance = async () => {
      try {
        const balanceWei = await provider.getBalance(MAIN_ADDRESS);
        const balanceEther = ethers.utils.formatEther(balanceWei);

        if (balanceEther < 0.015) {
          setLowBalanceMsg(true);
        } else {
          setLowBalanceMsg(false);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    fetchBalance();
  }, []);

  // If no reCAPTCHA site key is configured, auto-set captcha token for development
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY === 'your_recaptcha_site_key_here') {
      setCaptchaToken('development_mode');
    }
  }, [RECAPTCHA_SITE_KEY]);

  const handleClaimFaucet = async () => {
    setLoading(true);
    const inputVal = "";
    const token = captchaToken;
    
    try {
      const humanCheck = await fetch(
        "https://recaptcha-dusky.vercel.app/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, inputVal }),
        }
      );
      
      const data = await humanCheck.text();

      if (data) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/drip`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipientAddress }),
        });

        if (response.ok) {
          Send(
            ` 🎉 Congratulations! ${
              recipientAddress.slice(0, 7) +
              "..." +
              recipientAddress.slice(
                recipientAddress.length - 5,
                recipientAddress.length
              )
            } just claimed the faucet 0.01 ETH from Lampros DAO on Arbitrum Sepolia! 🎉`
          );

          setLoading(false);
          const responseData = await response.json();
          setMessage(responseData.message);
          setReceipt(responseData.receipt);
          setShowConfetti(true);
          setError(null);
        } else {
          setLoading(false);
          const errorData = await response.json();
          setError(errorData.message);
          setMessage("");
          setReceipt("");
        }
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred while processing your request.");
      setMessage("");
      setReceipt("");
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const isValidSiteKey = RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== 'your_recaptcha_site_key_here';
  const isClaimDisabled = !hasJoinedTelegram || !captchaToken || showLowBalanceMsg || showConfetti || !hasValidAddress;

  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Claim Your ETH</h2>
        <p className="step-subtitle">
          Complete the captcha below to claim your 0.01 ETH on Arbitrum Sepolia!
        </p>
      </div>

      <div className="faucet-content">
        <div className="requirements-check">
          <div className={`requirement-item ${hasValidAddress ? 'completed' : 'pending'}`}>
            <span className="requirement-icon">
              {hasValidAddress ? '✓' : '○'}
            </span>
            <span>Valid wallet address connected</span>
          </div>
          <div className={`requirement-item ${hasJoinedTelegram ? 'completed' : 'pending'}`}>
            <span className="requirement-icon">
              {hasJoinedTelegram ? '✓' : '○'}
            </span>
            <span>Joined Telegram community</span>
          </div>
          <div className={`requirement-item ${captchaToken ? 'completed' : 'pending'}`}>
            <span className="requirement-icon">
              {captchaToken ? '✓' : '○'}
            </span>
            <span>Completed reCAPTCHA verification</span>
          </div>
        </div>

        {isValidSiteKey ? (
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              ref={captchaRef}
              onChange={handleCaptchaChange}
              theme="dark"
              className={showLowBalanceMsg ? "disabled recaptcha" : "recaptcha"}
            />
          </div>
        ) : (
          <div className="recaptcha-placeholder">
            <div className="development-notice">
              <p className="error_msg">
                ⚠️ Development Mode: reCAPTCHA not configured
              </p>
              <p style={{color: '#ffffff', fontSize: '0.9rem', marginTop: '10px'}}>
                To enable reCAPTCHA, get a site key from{' '}
                <a 
                  href="https://www.google.com/recaptcha/admin/create" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{color: '#00d4ff'}}
                >
                  Google reCAPTCHA
                </a>
                {' '}and update your .env file
              </p>
            </div>
          </div>
        )}

        <div className="claim-section">
          <button
            className={isClaimDisabled ? "claim-faucet disabled" : "claim-faucet"}
            onClick={handleClaimFaucet}
            disabled={isClaimDisabled}
          >
            {showConfetti ? "Successfully Claimed!" : loading ? "Claiming..." : "Claim 0.01 ETH"}
          </button>

          {!hasValidAddress && (
            <p className="error_msg">Please go back and connect your wallet first.</p>
          )}
          
          {!hasJoinedTelegram && hasValidAddress && (
            <p className="error_msg">Please join our Telegram channel first.</p>
          )}
          
          {!captchaToken && hasJoinedTelegram && hasValidAddress && isValidSiteKey && (
            <p className="error_msg">Complete the captcha to claim faucet rewards.</p>
          )}
        </div>

        {showLowBalanceMsg && (
          <div className="lb_div err_msg_div">
            <span className="lb_title">
              Oops! The Faucet is Taking a Coffee Break! ☕
            </span>
            <p className="lb_msg">
              Looks like the faucet is out of ETH for now. It's taking a coffee
              break! Try again later.
            </p>
          </div>
        )}
        
        {(message || receipt || error) && (
          <div className="err_msg_div">
            {message && <p className="message">{message}</p>}
            {receipt && (
              <p className="tx_hash">
                TxHash:{" "}
                <a
                  href={`https://sepolia.arbiscan.io/tx/${receipt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {receipt}
                </a>
              </p>
            )}
            {error && <p className="error_msg">Error : {error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaucetStep; 