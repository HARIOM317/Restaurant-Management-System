class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
    this.keywords = {
      greeting: /(hello|hi|hey)/i,
      location: /(located|location)/i,
      contact: /(contact details|phone number|email|contact)/i,
      wifi: /(wi-fi|wifi)/i,
      events: /(special events|parties|events)/i,
      menu: /(menu|food|dishes)/i,
      dietary: /(vegetarian|vegan|gluten-free|dietary restrictions)/i,
      specials: /(specials|today's specials)/i,
      order: /(pickup order|delivery order|customize order|issue with my order|order issue|report a problem)/i,
      discounts: /(discounts|promotions|discount code|coupon|discount)/i,
      reservation: /(reservation|book a table|table reservation|reschedule|cancel reservation|booking)/i,
      loyalty: /(loyalty|loyalty program|earn points|redeem points|point balance|check balance)/i,
      payment: /(payment methods|pay online|minimum order amount|pricing|payment)/i,
      refund: /(refund policy|how to get a refund|refund process|refund)/i, 
      social: /(facebook|instagram|social media|follow on instagram|instagram-only promotions|discount for following on instagram)/i,
      media: /(360 view|gallery images|qr code|tour)/i,
      feedback: /(feedback|review|rating)/i,
      support: /(support|customer support|issue with my order|report a problem)/i,
    };
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    // Check for greetings
    if (this.keywords.greeting.test(lowerCaseMessage)) {
      this.actionProvider.handleHello();
      return;
    }

    // Check for other categories using keywords
    for (const category in this.keywords) {
      if (this.keywords[category].test(lowerCaseMessage)) {
        switch (category) {
          case 'location':
            this.actionProvider.handleLocation();
            return;
          case 'contact':
            this.actionProvider.handleContactDetails();
            return;
          case 'wifi':
            this.actionProvider.handleWiFi();
            return;
          case 'events':
            this.actionProvider.handleSpecialEvents();
            return;
          case 'menu':
            this.actionProvider.handleMenu();
            return;
          case 'dietary':
            this.actionProvider.handleSpecialDietaryOptions();
            return;
          case 'specials':
            this.actionProvider.handleSpecials();
            return;
          case 'order':
            this.actionProvider.handlePickupOrder();
            return;
          case 'discounts': 
            this.actionProvider.handleDiscountsPromotions();
            return;
          case 'reservation': 
            this.actionProvider.handleReservation();
            return;
          case 'loyalty': 
            this.actionProvider.handleLoyaltyProgram();
            return;
          case 'payment': 
            this.actionProvider.handlePaymentMethods();
            return;
          case 'refund': 
            this.actionProvider.handleRefundPolicy();
            return;
          case 'social': 
            this.actionProvider.handleSocialMedia();
            return;
          case 'media': 
            this.actionProvider.handle360View();
            return;
          case 'feedback':
            this.actionProvider.handleFeedbackReview();
            return;
          case 'support':
            this.actionProvider.handleCustomerSupport();
            return;
          default:
            this.actionProvider.handleDefault();
            return;
        }
      }
    }

    this.actionProvider.handleDefault();
  }
}

export default MessageParser;
