// components/Options/FeedbackSupportOptions.jsx

import React from 'react';
import './Options.css';
import { createChatBotMessage } from "react-chatbot-kit";

const FeedbackSupportOptions = ({ setState }) => {
  const options = [
    { text: 'Submit Feedback', handler: () => handleFeedbackSupportResponse('You can leave feedback or a review on our website or on our social media pages: https://www.instagram.com/sky_hut_cafe_restro/') },
    { text: 'Customer Support', handler: () => handleFeedbackSupportResponse('You can contact our customer support team at skyhutweb@gmail.com or call us at 9755433233.') },
    { text: 'Report an Issue', handler: () => handleFeedbackSupportResponse('Please report any issues with the website to skyhutweb@gmail.com.') },
    { text: 'FAQs', handler: () => handleFeedbackSupportResponse('You can view our frequently asked questions on our website.') },
  ];

  function handleFeedbackSupportResponse(response) {
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

export default FeedbackSupportOptions;
