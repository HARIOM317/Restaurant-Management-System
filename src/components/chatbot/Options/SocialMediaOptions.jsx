// components/Options/SocialMediaOptions.jsx

import React from 'react';
import './Options.css';
import { createChatBotMessage } from "react-chatbot-kit";

const SocialMediaOptions = ({ setState }) => {
  const options = [
    { text: 'Follow Us on Instagram', handler: () => handleSocialMediaResponse('Follow us on Instagram here: https://www.instagram.com/sky_hut_cafe_restro/') },
    { text: 'Join Our Community', handler: () => handleSocialMediaResponse('Join our community and website for the latest updates: ') },
    { text: 'Share Your Experience', handler: () => handleSocialMediaResponse('Share your experience with us on social media: https://www.instagram.com/sky_hut_cafe_restro/') },
    { text: 'View Social Media Feeds', handler: () => handleSocialMediaResponse('Check out our latest social media posts here: https://www.instagram.com/sky_hut_cafe_restro/') },
  ];

  function handleSocialMediaResponse(response) {
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

export default SocialMediaOptions;
