// components/Options/GeneralInfoOptions.jsx

import React from 'react';
import './Options.css';
import { createChatBotMessage } from "react-chatbot-kit";

const GeneralInfoOptions = ({ setState }) => {
  const options = [
    { text: 'Opening Hours', handler: () => handleGeneralInfoResponse('Our opening hours are:\n- Monday to Friday: 8 AM - 10 PM\n- Saturday and Sunday: 9 AM - 11 PM') },
    { text: 'Location', handler: () => handleGeneralInfoResponse('We are located at New Jail Rd, Sanjeev Nagar, Navri, Bhopal, Madhya Pradesh 462038. Here is a link to our location on Google Maps: https://t.ly/QHP3d') },
    { text: 'Parking Facilities', handler: () => handleGeneralInfoResponse('Yes, we have ample parking space available for our customers.') },
    { text: 'Contact Details', handler: () => handleGeneralInfoResponse('You can contact us at:\n- Phone: 9755433233\n- Email: skyhutweb@gmail.com') },
    { text: 'Wi-Fi Availability', handler: () => handleGeneralInfoResponse('Yes, we offer free Wi-Fi for all our customers.') },
    { text: 'Special Events', handler: () => handleGeneralInfoResponse('We have the following events coming up:\n- ... on ...\n- ... on ...') },
  ];

  function handleGeneralInfoResponse(response) {
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

export default GeneralInfoOptions;
