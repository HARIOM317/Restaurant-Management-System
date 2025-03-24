import { createChatBotMessage } from "react-chatbot-kit";
import Options from './Options/Options';
import GeneralInfoOptions from './Options/GeneralInfoOptions';
import MenuOrderingOptions from './Options/MenuOrderingOptions';
import ReservationsEventsOptions from './Options/ReservationsEventsOptions';
import LoyaltyRewardsOptions from './Options/LoyaltyRewardsOptions';
import PaymentPricingOptions from './Options/PaymentPricingOptions';
import SpecialRequestsOptions from './Options/SpecialRequestsOptions';
import FeedbackSupportOptions from './Options/FeedbackSupportOptions';
import SocialMediaOptions from './Options/SocialMediaOptions';
import AdditionalFeaturesOptions from './Options/AdditionalFeaturesOptions';

import Avatar from "./Avatar";

const config = {
  botName: "SkyHutBot",
  initialMessages: [
    createChatBotMessage("Hello there! 👋 It's nice to meet you!"),
    createChatBotMessage(
      "What brings you here today? Please use the navigation below or ask me anything about Sky Hut Cafe.",
      {
        withAvatar: false,
        delay: 800,
        widget: "options",
      }
    ),
  ],
  customComponents: {
    botAvatar: (props) => <Avatar {...props} />,
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "generalInfoOptions",
      widgetFunc: (props) => <GeneralInfoOptions {...props} />,
    },
    {
      widgetName: "menuOrderingOptions",
      widgetFunc: (props) => <MenuOrderingOptions {...props} />,
    },
    {
      widgetName: "reservationsEventsOptions",
      widgetFunc: (props) => <ReservationsEventsOptions {...props} />,
    },
    {
      widgetName: "loyaltyRewardsOptions",
      widgetFunc: (props) => <LoyaltyRewardsOptions {...props} />,
    },
    {
      widgetName: "paymentPricingOptions",
      widgetFunc: (props) => <PaymentPricingOptions {...props} />,
    },
    {
      widgetName: "specialRequestsOptions",
      widgetFunc: (props) => <SpecialRequestsOptions {...props} />,
    },
    {
      widgetName: "feedbackSupportOptions",
      widgetFunc: (props) => <FeedbackSupportOptions {...props} />,
    },
    {
      widgetName: "socialMediaOptions",
      widgetFunc: (props) => <SocialMediaOptions {...props} />,
    },
    {
      widgetName: "additionalFeaturesOptions",
      widgetFunc: (props) => <AdditionalFeaturesOptions {...props} />,
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "var(--primaryHoverColor)",
    },
    chatButton: {
      backgroundColor: "var(--primaryColor)",
    },
    userMessageBox: {
      backgroundColor: "var(--primaryColor)",
    },
    userText: {
      color: "var(--textColor)",
    },
  },
};

export default config;
