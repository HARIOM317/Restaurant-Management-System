import React, { useState } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import './ChatbotWidget.css';
import chatbotIcon from '../../assets/chatbot.jpg';
import config from './config';

const ChatbotWidget = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div>
      <div className="chatbot-container" onClick={toggleChatbot}>
        <img
          src={chatbotIcon}
          alt="Chatbot"
          className="chatbot-icon"
        />
        {!showChatbot && (
          <div className="popout-message">
            Hi there!
          </div>
        )}
      </div>
      {showChatbot && (
        <div className="chatbot">
          <Chatbot 
            config={config} 
            headerText='Welcome to Sky Hut Cafe!' 
            actionProvider={ActionProvider} 
            messageParser={MessageParser} 
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
