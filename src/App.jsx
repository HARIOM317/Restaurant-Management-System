import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "./store/apiUrl";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Modal } from "antd";

// Public Routes
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import MenuPage from "./pages/MenuPage";
import BookReservation from "./pages/BookReservation";
import ContactUsPage from "./pages/ContactUsPage";
import Cart from "./pages/CartPage";
import PlaceOrder from "./pages/PlaceOrderPage";

// login & Registration
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";

// Offline Pages
import OfflineMenuPage from "./pages/OfflineMenuPage";
import OfflineCartPage from "./pages/OfflineCartPage";

// User Protected Route
import VerifyEvent from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
import UserReservationPage from "./pages/UserReservationPage";
import UserOfflineOrdersPage from "./pages/UserOfflineOrdersPage";

// User Offline Protected Route
import MyOrdersAtSkyHut from "./pages/MyOrdersAtSkyHut";
import UserReservationPageAtSkyHut from "./pages/UserReservationPageAtSkyHut";
import UserOfflineOrdersPageAtSkyHut from "./pages/UserOfflineOrdersPageAtSkyHut";

// Staff Routes
import StaffOrdersPage from "./components/staff/pages/StaffOrdersPage";
import StaffReservationsPage from "./components/staff/pages/StaffReservationsPage";
import StaffOfflineOrdersPage from "./components/staff/pages/StaffOfflineOrdersPage";
import StaffEventsPage from "./components/staff/pages/StaffEventsPage";
import StaffFoodListPage from "./components/staff/pages/StaffFoodListPage";
import StaffAddFood from "./components/staff/pages/StaffAddFood";
import StaffManageTablePage from "./components/staff/pages/StaffManageTablePage";
import StaffManageHutPage from "./components/staff/pages/StaffManageHutPage";
import StaffCustomerReviewPage from "./components/staff/pages/StaffCustomerReviewsPage";
import StaffContactMessages from "./components/staff/pages/StaffContactMessages";

// Admin Protected Routes
import Dashboard from "./components/Admin/pages/Dashboard";
import OrdersPage from "./components/Admin/pages/OrdersPage";
import ReservationsPage from "./components/Admin/pages/ReservationsPage";
import OfflineOrders from "./components/Admin/pages/OfflineOrders";
import EventsPage from "./components/Admin/pages/EventsPage";
import ItemListPage from "./components/Admin/pages/ItemListPage";
import AddPage from "./components/Admin/pages/AddPage";
import Staff from "./components/Admin/pages/Staff";
import PromotionPage from "./components/Admin/pages/PromotionPage";
import AddNewPromotion from "./components/Admin/pages/AddNewPromotion";
import ManageHutPage from "./components/Admin/pages/ManageHutPage";
import ManageTablePage from "./components/Admin/pages/ManageTablePage";
import ManagePopUp from "./components/Admin/pages/ManagePopUp";
import ManageCarousels from "./components/Admin/pages/ManageCarousels";
import AddNewCarousel from "./components/Admin/pages/AddNewCarousel";
import EditCarousel from "./components/Admin/pages/EditCarousel";
import AllUsers from "./components/Admin/pages/AllUsers";
import CustomerReviewPage from "./components/Admin/pages/CustomerReviewPage";
import ContactMessages from "./components/Admin/pages/ContactMessages";

// Error 404
import Error404 from "./pages/Error404";

// To Protect Routes
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsConditions";
import RefundAndCancellationPolicy from "./pages/RefundPolicy";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const imgUrl = `${API_URL}/images/`;

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/popup/all`);
        if (response.data.success && response.data.popups.length > 0) {
          const activePopup = response.data.popups.find(
            (popup) => popup.is_active
          );
          if (activePopup) {
            setPopupData(activePopup);
            const today = new Date().toISOString().split("T")[0];
            const lastShown = localStorage.getItem("lastModalShown");

            if (lastShown !== today) {
              setIsModalVisible(true);
              localStorage.setItem("lastModalShown", today);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    fetchPopupData();
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={"app"}>
        <ToastContainer />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<BookReservation />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />

          {/* login & Registration */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />

          {/* Offline Pages */}
          <Route
            path="/offline-menu"
            element={
              <ProtectedRoute
                element={OfflineMenuPage}
                requiredRoles={["admin", "customer"]}
              />
            }
          />
          <Route
            path="/offline-cart"
            element={
              <ProtectedRoute
                element={OfflineCartPage}
                requiredRoles={["admin", "customer"]}
              />
            }
          />

          {/* User Protected Route */}
          <Route
            path="/verify"
            element={
              <ProtectedRoute
                element={VerifyEvent}
                requiredRoles={["customer"]}
              />
            }
          />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute element={MyOrders} requiredRoles={["customer"]} />
            }
          />
          <Route
            path="/my-reservations"
            element={
              <ProtectedRoute
                element={UserReservationPage}
                requiredRoles={["customer"]}
              />
            }
          />
          <Route
            path="/my-offline-orders"
            element={
              <ProtectedRoute
                element={UserOfflineOrdersPage}
                requiredRoles={["customer"]}
              />
            }
          />

          {/* User Offline Protected Route */}
          <Route
            path="/offline/my-orders"
            element={
              <ProtectedRoute
                element={MyOrdersAtSkyHut}
                requiredRoles={["customer"]}
              />
            }
          />
          <Route
            path="/offline/my-reservations"
            element={
              <ProtectedRoute
                element={UserReservationPageAtSkyHut}
                requiredRoles={["customer"]}
              />
            }
          />
          <Route
            path="/offline/my-offline-orders"
            element={
              <ProtectedRoute
                element={UserOfflineOrdersPageAtSkyHut}
                requiredRoles={["customer"]}
              />
            }
          />

          {/* Staff Routes */}
          <Route
            path="/staff/orders"
            element={
              <ProtectedRoute
                element={StaffOrdersPage}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/reservations"
            element={
              <ProtectedRoute
                element={StaffReservationsPage}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/offline-orders"
            element={
              <ProtectedRoute
                element={StaffOfflineOrdersPage}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/events"
            element={
              <ProtectedRoute
                element={StaffEventsPage}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/items-list"
            element={
              <ProtectedRoute
                element={StaffFoodListPage}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/food/add"
            element={
              <ProtectedRoute
                element={StaffAddFood}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/tables"
            element={
              <ProtectedRoute
                element={StaffManageTablePage}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/huts"
            element={
              <ProtectedRoute
                element={StaffManageHutPage}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/reviews"
            element={
              <ProtectedRoute
                element={StaffCustomerReviewPage}
                requiredRoles={["admin", "staff"]}
              />
            }
          />
          <Route
            path="/staff/contact"
            element={
              <ProtectedRoute
                element={StaffContactMessages}
                requiredRoles={["admin", "staff"]}
              />
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute element={Dashboard} requiredRoles={["admin"]} />
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute element={OrdersPage} requiredRoles={["admin"]} />
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute
                element={ReservationsPage}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/offline-orders"
            element={
              <ProtectedRoute
                element={OfflineOrders}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute element={EventsPage} requiredRoles={["admin"]} />
            }
          />
          <Route
            path="/admin/items-list"
            element={
              <ProtectedRoute
                element={ItemListPage}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/food/add"
            element={
              <ProtectedRoute element={AddPage} requiredRoles={["admin"]} />
            }
          />
          <Route
            path="/admin/staff"
            element={
              <ProtectedRoute element={Staff} requiredRoles={["admin"]} />
            }
          />
          <Route
            path="/admin/promotions"
            element={
              <ProtectedRoute
                element={PromotionPage}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/promotion/new-promotion"
            element={
              <ProtectedRoute
                element={AddNewPromotion}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/huts"
            element={
              <ProtectedRoute
                element={ManageHutPage}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/tables"
            element={
              <ProtectedRoute
                element={ManageTablePage}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/pop-up"
            element={
              <ProtectedRoute element={ManagePopUp} requiredRoles={["admin"]} />
            }
          />
          <Route
            path="/admin/banners"
            element={
              <ProtectedRoute
                element={ManageCarousels}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/carousel/new"
            element={
              <ProtectedRoute
                element={AddNewCarousel}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/carousel/edit/:id"
            element={
              <ProtectedRoute
                element={EditCarousel}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute element={AllUsers} requiredRoles={["admin"]} />
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute
                element={CustomerReviewPage}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/contact"
            element={
              <ProtectedRoute
                element={ContactMessages}
                requiredRoles={["admin"]}
              />
            }
          />

          {/* Routes for the Policies */}
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
          <Route path="/refund-and-cancellation-policy" element={<RefundAndCancellationPolicy/>} />

          {/* Error 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>

      <Modal
        title="🎗️Limited Offer🎗️"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        width={300}
      >
        {popupData ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <img
              src={imgUrl + popupData.image_url}
              alt="Popup"
              style={{
                width: "200px",
                borderRadius: "8px",
                border: "1px solid var(--borderColor)",
              }}
            />
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default App;
