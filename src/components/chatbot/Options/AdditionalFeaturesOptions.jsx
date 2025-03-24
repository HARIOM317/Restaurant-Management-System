// components/Options/AdditionalFeaturesOptions.jsx

import React from 'react';
import './Options.css';
import { createChatBotMessage } from "react-chatbot-kit";

const AdditionalFeaturesOptions = ({ setState }) => {
  const options = [
    { text: 'QR Code for Offline Orders', handler: () => handleAdditionalFeaturesResponse('Scan QR code placed on the table to place an offline order') },
    { text: 'Automated Discounts and Offers', handler: () => handleAdditionalFeaturesResponse('Yes, we currently have the following promotions: - King15 Apply and Get 15% discount') },
    { text: 'Loyalty Points', handler: () => handleAdditionalFeaturesResponse('Our loyalty program allows you to earn points for every purchase, which you can redeem for discounts and special offers.') },
    { text: 'Email Notifications', handler: () => handleAdditionalFeaturesResponse('You can contact us at: - Phone: 9755433233 - Email: skyhutweb@gmail.com') },
  ];

  function handleAdditionalFeaturesResponse(response) {
    const message = createChatBotMessage(response);
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  }

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <button key={index} onClick={option.handler} className="option-button">
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default AdditionalFeaturesOptions;
