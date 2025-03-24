import React from 'react';
import './Options.css';
import { createChatBotMessage } from "react-chatbot-kit";

const Options = ({ setState }) => {
  const createHandler = (widgetName) => () => {
    console.log("createHandler called",widgetName);
    const messages = [
      createChatBotMessage('What would you like to know?', {
        widget: widgetName,
      }),
    ];
    setState((prev) => ({ ...prev, messages: [...prev.messages, ...messages] }));
  };

  const options = [
    { text: 'General Information', widgetName: 'generalInfoOptions' },
    { text: 'Menu and Ordering', widgetName: 'menuOrderingOptions' },
    { text: 'Reservations and Events', widgetName: 'reservationsEventsOptions' },
    { text: 'Loyalty and Rewards', widgetName: 'loyaltyRewardsOptions' },
    { text: 'Payment and Pricing', widgetName: 'paymentPricingOptions' },
    { text: 'Special Requests', widgetName: 'specialRequestsOptions' },
    { text: 'Feedback and Support', widgetName: 'feedbackSupportOptions' },
    { text: 'Social Media and Community', widgetName: 'socialMediaOptions' },
    { text: 'Additional Features', widgetName: 'additionalFeaturesOptions' },
  ];

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={createHandler(option.widgetName)}
          className="option-button"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Options;
