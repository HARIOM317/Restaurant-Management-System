// components/Options/ReservationsEventsOptions.jsx

import React from 'react';
import './Options.css';
import { createChatBotMessage } from "react-chatbot-kit";

const ReservationsEventsOptions = ({ setState }) => {
  const options = [
    { text: 'Make a Reservation', handler: () => handleReservationsEventsResponse('You can make a reservation here: https://skyhut.com/reservations') },
    { text: 'Event Booking', handler: () => handleReservationsEventsResponse('You can book an event here & filling book reservation form: https://skyhut.com/services') },
    { text: 'View Upcoming Events', handler: () => handleReservationsEventsResponse('You can view our upcoming events on banners') },
    { text: 'Cancel Reservation', handler: () => handleReservationsEventsResponse('To cancel a reservation go to profile->reservation, please provide your reservation cancel reason') },
  ];

  function handleReservationsEventsResponse(response) {
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

export default ReservationsEventsOptions;
