import promoModel from "../models/promoModel.js";

const getAllPromos = async (req, res) => {
  try {
    const offers = await promoModel.find();
    if (!offers || offers.length === 0) {
      return res.status(404).json({ message: "No Offers Found" });
    }
    return res.status(200).json(offers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createPromo = async (req, res) => {
  try {
    const offer = await promoModel.create(req.body);
    res.status(201).json(`Offer added successfully! ${offer}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPromoById = async (req, res) => {
  try {
    const id = req.params.id;
    const offer = await promoModel.findById(id);
    return res.status(200).json(offer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePromo = async (req, res) => {
  try {
    const offerId = req.params.id;
    const updateData = req.body;

    const updatedOffer = await promoModel.findByIdAndUpdate(
      offerId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found." });
    }

    return res.status(200).json({
      message: "Offer updated successfully.",
      offer: updatedOffer,
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deletePromo = async (req, res) => {
  try {
    const id = req.params.id;
    await promoModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Apply a promo code to an order and track the user who used it
const applyPromoCode = async (req, res) => {
  try {
    const { userId, promoCode } = req.body;
    const promo = await promoModel.findOne({ code: promoCode });

    if (!promo) {
      return res.status(404).json({ success: false, message: "Promo code not found" });
    }

    if (promo.useCount >= promo.useTotal) {
      return res.status(400).json({ success: false, message: "Promo code usage limit reached" });
    }

    if (new Date() > promo.end_date) {
      return res.status(400).json({ success: false, message: "Promo code has expired" });
    }

    if (!promo.is_active) {
      return res.status(400).json({ success: false, message: "Promo code is inactive" });
    }

    // Check if the user has already used the promo code
    if (promo.users.includes(userId)) {
      return res.status(400).json({ success: false, message: "User has already used this promo code" });
    }

    // Track the user who used the promo code
    promo.users.push(userId);
    promo.useCount += 1;
    await promo.save();

    res.status(200).json({
      success: true,
      message: "Promo code applied successfully",
      discount: promo.discount,
      discountType: promo.discountType
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  createPromo,
  deletePromo,
  getAllPromos,
  getPromoById,
  updatePromo,
  applyPromoCode
};
