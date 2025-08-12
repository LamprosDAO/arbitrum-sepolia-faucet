import React from "react";
import telegramQR from "../asset/images/telegram_qr.png";

const TelegramStep = ({ hasJoinedTelegram, setHasJoinedTelegram }) => {
  const TELEGRAM_CHANNEL_URL = "https://t.me/+G55xO-18czg5NDA1";
  
  const handleTelegramJoin = () => {
    window.open(TELEGRAM_CHANNEL_URL, '_blank');
    setHasJoinedTelegram(true);
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Join Our Community</h2>
        <p className="step-subtitle">
          Join the Speedrun Stylus community on Telegram to stay updated with the latest news, 
          tutorials, and connect with other developers!
        </p>
      </div>

      <div className="telegram-content">
        <div className="telegram-card">
          <div className="telegram-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" 
                fill="#00d4ff"
              />
            </svg>
          </div>
          
          <div className="telegram-info">
            <h3>Speedrun Stylus</h3>
            <p>Join our community for updates and support</p>
          </div>
        </div>

        <div className="telegram-qr-section">
          <div className="qr-code-container">
            <img 
              src={telegramQR} 
              alt="Telegram QR Code" 
              className="telegram-qr-code"
              onClick={handleTelegramJoin}
            />
          </div>
          <p className="qr-instruction">
            Scan the QR code with your phone to join our Telegram channel
          </p>
        </div>
        
        <p className="telegram-url">
          Channel: <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            @SpeedrunStylus
          </a>
        </p>
        
        {hasJoinedTelegram && (
          <div className="success-indicator">
            <p className="success_msg">
              ✓ Successfully joined our Telegram community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelegramStep; 