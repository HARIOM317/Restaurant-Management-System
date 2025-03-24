// components/Options/PaymentPricingOptions.jsx

import React from 'react';
import './Options.css';
import { createChatBotMessage } from "react-chatbot-kit";

const PaymentPricingOptions = ({ setState }) => {
  const options = [
    { text: 'Accepted Payment Methods', handler: () => handlePaymentPricingResponse('We accept various payment methods including credit/debit cards, UPI, PayPal, and cash.') },
    { text: 'Pricing Information', handler: () => handlePaymentPricingResponse('You can view our prices on website menu') },
    { text: 'Apply Discount Code', handler: () => handlePaymentPricingResponse('To apply a discount code, enter the code at checkout') },
    { text: 'Refund Policy', handler: () => handlePaymentPricingResponse('Our refund policy can be found here: https://skyhut.com/refund-policy') },
  ];

  function handlePaymentPricingResponse(response) {
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

export default PaymentPricingOptions;
