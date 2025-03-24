import React from 'react';
import ChatbotIcon from '../../assets/chatbot.png';
import './ChatbotWidget.css';

const Avatar = () => {
  return (
    <div className="avatar-container">
      <img src={ChatbotIcon} alt="Chatbot Icon" className="avatar-img" />
    </div>
  );
};

export default Avatar;
