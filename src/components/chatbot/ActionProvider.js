// ActionProvider.js

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHello() {
    const message = this.createChatBotMessage("Hello! How can I help you?");
    this.updateChatbotState(message);
  }

  handleOpeningHours() {
    const message = this.createChatBotMessage(`Our opening hours are:
      - Monday to Friday: 8 AM - 10 PM
      - Saturday and Sunday: 9 AM - 11 PM`);
    this.updateChatbotState(message);
  }

  handleLocation() {
    const message = this.createChatBotMessage(`We are located at New Jail Rd, Sanjeev Nagar, Navri, Bhopal, Madhya Pradesh 462038. Here is a link to our location on Google Maps: https://t.ly/QHP3d`);
    this.updateChatbotState(message);
  }

  handleParking() {
    const message = this.createChatBotMessage("Yes, we have ample parking space available for our customers.");
    this.updateChatbotState(message);
  }

  handleContactDetails() {
    const message = this.createChatBotMessage(`You can contact us at:
      - Phone: 9755433233
      - Email: skyhutweb@gmail.com`);
    this.updateChatbotState(message);
  }

  handleWiFi() {
    const message = this.createChatBotMessage("Yes, we offer free Wi-Fi for all our customers.");
    this.updateChatbotState(message);
  }

  handleSpecialEvents() {
    const message = this.createChatBotMessage(`We have the following events coming up:
      - 
      - `);
    this.updateChatbotState(message);
  }

  handleMenu() {
    const message = this.createChatBotMessage("You can view our complete menu here: https://www.skyhutcafe.com/menu");
    this.updateChatbotState(message);
  }

  handleSpecialDietaryOptions() {
    const message = this.createChatBotMessage("Yes, we have a 100% vegetarian options available on our menu.");
    this.updateChatbotState(message);
  }

  handleSpecials() {
    const message = this.createChatBotMessage(`Today's specials are:
      - Kulhad Pizza
      - Special Paneer`);
    this.updateChatbotState(message);
  }

  handleDrinkMenu() {
    const message = this.createChatBotMessage("Sure! You can select & view our drink menu here: https://www.skyhutcafe.com/menu");
    this.updateChatbotState(message);
  }

  handlePickupOrder() {
    const message = this.createChatBotMessage("You can place a order through our website: https://www.skyhutcafe.com/myorders or call us at 9755433233.");
    this.updateChatbotState(message);
  }

  handleDeliveryOrder() {
    const message = this.createChatBotMessage("You can place a order through our website: https://www.skyhutcafe.com/myorders or call us at 9755433233.");
    this.updateChatbotState(message);
  }

  handleDiscountsPromotions() {
    const message = this.createChatBotMessage(`Yes, we currently have the following promotions:
      - King15 Apply and Get 15% discount 
      - `);
    this.updateChatbotState(message);
  }

  handleReservation() {
    const message = this.createChatBotMessage("You can make a reservation through our website: https://www.skyhutcafe.com/reservation or call us at 9755433233.");
    this.updateChatbotState(message);
  }

  handleLargeGroupReservation() {
    const message = this.createChatBotMessage("Yes, we can accommodate large groups. Please provide the number of guests and the date and time for the reservation.");
    this.updateChatbotState(message);
  }

  handlePrivateEvents() {
    const message = this.createChatBotMessage("Yes, we do! You can book our event space for private parties. Please fill event booking form here: https://www.skyhutcafe.com/services");
    this.updateChatbotState(message);
  }

  handleEventBookingFee() {
    const message = this.createChatBotMessage("Yes, there is a booking fee depending on the size and duration of the event. Please contact us at 9755433233 for more details.");
    this.updateChatbotState(message);
  }

  handleRescheduleCancelReservation() {
    const message = this.createChatBotMessage("Yes, you can reschedule or cancel your reservation by calling us at 9755433233.");
    this.updateChatbotState(message);
  }

  handleLoyaltyProgram() {
    const message = this.createChatBotMessage("Our loyalty program allows you to earn points for every purchase, which you can redeem for discounts and special offers.");
    this.updateChatbotState(message);
  }

  handleEarnPoints() {
    const message = this.createChatBotMessage("You earn points by making purchases at Sky Hut Cafe. Every Rs.10 spent earns you 10 points.");
    this.updateChatbotState(message);
  }

  handleRedeemPoints() {
    const message = this.createChatBotMessage("You can redeem your points for discount coupons by clicking profile then Reedeem Now");
    this.updateChatbotState(message);
  }

  handlePointBalance() {
    const message = this.createChatBotMessage("You can check your points balance in your account dashboard below your profile icon");
    this.updateChatbotState(message);
  }

  handleCheckBalance() {
    const message = this.createChatBotMessage("You can check your balance in your account dashboard");
    this.updateChatbotState(message);
  }

  handlePaymentMethods() {
    const message = this.createChatBotMessage("We accept cash, credit/debit cards, and digital wallets like UPI, Google Pay, Amazon Pay etc..");
    this.updateChatbotState(message);
  }

  handlePayOnline() {
    const message = this.createChatBotMessage("Yes, you can pay online through our website when placing an order or making a reservation.");
    this.updateChatbotState(message);
  }

  handleMinimumOrderAmount() {
    const message = this.createChatBotMessage("Yes, there is a minimum order amount of Rs. 100 for delivery.");
    this.updateChatbotState(message);
  }

  handlePricing() {
    const message = this.createChatBotMessage("The pricing varies depending on the menu items and special offers available.");
    this.updateChatbotState(message);
  }

  handleDiscountCode() {
    const message = this.createChatBotMessage("You can enter a discount code during checkout to apply discounts or special offers.");
    this.updateChatbotState(message);
  }

  handleRefundPolicy() {
    const message = this.createChatBotMessage("Our refund policy allows no refunds. Please contact us for more details.");
    this.updateChatbotState(message);
  }

  handleCustomizeOrder() {
    const message = this.createChatBotMessage("Yes, you can customize your order. Please specify your preferences when placing your order.");
    this.updateChatbotState(message);
  }

  handleDietaryRestrictions() {
    const message = this.createChatBotMessage("Yes, we accommodate various dietary restrictions. Please inform us of any specific requirements.");
    this.updateChatbotState(message);
  }

  handleSpecificTable() {
    const message = this.createChatBotMessage("Yes, you can request a specific table or area when making a reservation, and we will do our best to accommodate you.");
    this.updateChatbotState(message);
  }

  handleSpecialMenu() {
    const message = this.createChatBotMessage("Yes, we can create a special menu for your event. Please contact us to discuss your requirements.");
    this.updateChatbotState(message);
  }

  handleFeedbackReview() {
    const message = this.createChatBotMessage("You can leave feedback or a review on our website or on our social media pages: https://www.instagram.com/sky_hut_cafe_restro/");
    this.updateChatbotState(message);
  }

  handleCustomerSupport() {
    const message = this.createChatBotMessage("You can contact our customer support team at skyhutweb@gmail.com or call us at 9755433233.");
    this.updateChatbotState(message);
  }

  handleOrderIssue() {
    const message = this.createChatBotMessage("We apologize for the inconvenience. Please contact our support team at support@skyhutcafe.com or 9755433233 for assistance.");
    this.updateChatbotState(message);
  }

  handleReportProblem() {
    const message = this.createChatBotMessage("Please report any issues with the website to skyhutweb@gmail.com .");
    this.updateChatbotState(message);
  }

  handleSocialMedia() {
    const message = this.createChatBotMessage("You can follow us on social media here:");
    this.setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        message,
        {
          type: 'socialMediaOptions',
          options: [
            { text: 'Follow Us on Instagram', handler: () => this.handleFollowOnInstagram() },
            { text: 'Join Our Community', handler: () => this.handleJoinCommunity() },
            { text: 'Share Your Experience', handler: () => this.handleShareExperience() },
            { text: 'View Social Media Feeds', handler: () => this.handleViewSocialMediaFeeds() },
          ],
        },
      ],
    }));
  }

  handleFollowOnInstagram() {
    const message = this.createChatBotMessage("Follow us on Instagram here: https://www.instagram.com/sky_hut_cafe_restro/");
    this.updateChatbotState(message);
  }

  handleJoinCommunity() {
    const message = this.createChatBotMessage("Join our community for the latest updates: ");
    this.updateChatbotState(message);
  }

  handleShareExperience() {
    const message = this.createChatBotMessage("Share your experience with us on social media: https://www.instagram.com/sky_hut_cafe_restro/]");
    this.updateChatbotState(message);
  }

  handleViewSocialMediaFeeds() {
    const message = this.createChatBotMessage("Check out our latest social media posts here: https://www.instagram.com/sky_hut_cafe_restro/");
    this.updateChatbotState(message);
  }

  handleDiscountForInstagramFollow() {
    const message = this.createChatBotMessage("You can get a discount by following us on Instagram and showing the follow confirmation at checkout.");
    this.updateChatbotState(message);
  }

  handle360View() {
    const message = this.createChatBotMessage("You can view a 360-degree tour on homepage or about section.");
    this.updateChatbotState(message);
  }

  handleGalleryImages() {
    const message = this.createChatBotMessage("You can find the latest gallery images on our website");
    this.updateChatbotState(message);
  }

  handleQRCode() {
    const message = this.createChatBotMessage("Scan QR code placed on the table to place an offline order");
    this.updateChatbotState(message);
  }

  handleCancellationPolicy() {
    const message = this.createChatBotMessage("Our cancellation policy allows you to cancel your booking up to 3 days before the reservation time without any charges. After that, a cancellation fee may apply.");
    this.updateChatbotState(message);
  }

  handleDefault() {
    const message = this.createChatBotMessage("I'm sorry, I didn't understand that. Could you please ask something else?");
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
