import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import { API_URL } from "../store/apiUrl";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [role, setRole] = useState();
  const [food_list, setFoodList] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isInstagramFollower, setIsInstagramFollower] = useState(false);
  const [instagramDiscount, setInstagramDiscount] = useState(0);
  const [instagramDiscountAmount, setInstagramDiscountAmount] = useState(0);
  const [isOfflineOrder, setIsOfflineOrder] = useState(false);
  const [offlineTableId, setOfflineTableId] = useState(null);
  const [orderMode, setOrderMode] = useState(null);

  // New states for offline orders
  const [mode, setMode] = useState("online"); // 'online' or 'offline'
  const [tableId, setTableId] = useState(null);

  const [loading, setLoading] = useState(true);

  const foodListUrl = `${API_URL}/api/food/list`;

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (mode === "online" && token) {
      await axios.post(
        `${API_URL}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (mode === "online" && token) {
      await axios.post(
        `${API_URL}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(foodListUrl);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${API_URL}/api/cart/get`,
      {},
      { headers: { token } }
    );

    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }

    loadData();
  }, []);

  const placeOrder = async () => {
    const orderData = {
      items: cartItems,
      amount: getTotalCartAmount(),
    };

    if (mode === "offline") {
      orderData.table_id = tableId;
      const response = await axios.post(
        `${API_URL}/api/offline-order/place`,
        orderData
      );
      return response.data;
    } else {
      // Online order logic
    }
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    role,
    setRole,
    promoCode,
    setPromoCode,
    discount,
    setDiscount,
    discountAmount,
    setDiscountAmount,
    isInstagramFollower,
    setIsInstagramFollower,
    instagramDiscount,
    setInstagramDiscount,
    instagramDiscountAmount,
    setInstagramDiscountAmount,

    isOfflineOrder,
    setIsOfflineOrder,
    offlineTableId,
    setOfflineTableId,
    orderMode,
    setOrderMode,

    mode,
    setMode,
    tableId,
    setTableId,
    placeOrder,
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
