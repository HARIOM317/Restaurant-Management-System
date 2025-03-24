// components/Options/MenuOrderingOptions.jsx

import React from 'react';
import './Options.css';
import { createChatBotMessage } from "react-chatbot-kit";

const MenuOrderingOptions = ({ setState }) => {
  const options = [
    { text: 'View Menu', handler: () => handleMenuOrderingResponse('You can view our menu here: https://skyhut.com/menu') },
    { text: 'Order Online', handler: () => handleMenuOrderingResponse('You can place your order online here: https://skyhut.com/menu') },
    { text: 'Special Dietary Options', handler: () => handleMenuOrderingResponse('We offer a variety of options for special dietary needs. Please let us know your preferences when placing an order.') },
    { text: 'Popular Dishes', handler: () => handleMenuOrderingResponse('Some of our popular dishes include: Paneer Masala, Kulhad Pizza') },
  ];

  function handleMenuOrderingResponse(response) {
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

export default MenuOrderingOptions;
