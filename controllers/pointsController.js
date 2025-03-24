import userModel from "../models/userModel.js";
import promoModel from "../models/promoModel.js";

// Function to calculate membership status and discount
const getMembershipStatusAndDiscount = (points) => {
  if (points >= 2500) {
    return { status: 'Gold', discount: 0.15 };
  } else if (points >= 1000) {
    return { status: 'Silver', discount: 0.10 };
  } else if (points >= 200) {
    return { status: 'Bronze', discount: 0.05 };
  } else {
    return { status: 'Regular', discount: 0 };
  }
};

// Controller to add points to a user
export const addPoints = async (req, res) => {
  const { userId, points, description } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.points += points;
    const { status } = getMembershipStatusAndDiscount(user.points);
    user.membershipStatus = status;
    user.pointsHistory.push({ type: 'earn', points, description });

    await user.save();

    res.status(200).json({ message: 'Points added successfully', points: user.points, membershipStatus: user.membershipStatus });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get points of a user
export const getPoints = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ points: user.points, membershipStatus: user.membershipStatus });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to redeem points and create a discount coupon
export const redeemPoints = async (req, res) => {
  const { userId, points, description } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.points < points) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    const { discount } = getMembershipStatusAndDiscount(user.points);

    if (discount === 0) {
      return res.status(400).json({ message: 'User does not qualify for a discount' });
    }

    const discountAmount = points * discount;
    const couponCode = `Sky-${Date.now()}-${user.membershipStatus}`;

    const promo = new promoModel({
      code: couponCode,
      discountType: "fixed",
      discount: discountAmount,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      is_active: true,
      useCount: 0,
      useTotal: 1,
      category: "userSpecific",
    });

    await promo.save();

    user.points -= points;
    const { status } = getMembershipStatusAndDiscount(user.points);
    user.membershipStatus = status;
    user.pointsHistory.push({ type: 'redeem', points, description });

    await user.save();

    res.status(200).json({ message: 'Points redeemed successfully', couponCode, discountAmount, points: user.points, membershipStatus: user.membershipStatus });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get points history of a user
export const getPointsHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ pointsHistory: user.pointsHistory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
