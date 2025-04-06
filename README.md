# Sky Hut Cafe 🍽️
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/HARIOM317/Restaurant-Management-System) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 
[![Node.js Version](https://img.shields.io/badge/node-16.x-blue.svg)](https://nodejs.org/)

**A Complete Restaurant Management Solution | Built with MERN Stack**

**Live Demo:** [Sky Hut Cafe](https://www.skyhutcafe.com/)

<p align="center"><img src="https://github.com/user-attachments/assets/7c33f1d5-4eac-4e0e-8713-e841ba9af7ab" alt="Sky Hut Cafe" /></p>

---

## 📌 Overview

**Sky Hut Cafe** is a full-featured restaurant management web application built with the MERN stack. Designed to serve as a complete digital solution for restaurant operations, it includes role-based access for admins, staff, and users, enabling functionalities such as online ordering, real-time order management, event bookings, payments, reviews, and more.

This platform streamlines both customer-facing and backend operations for restaurants, offering a modern, scalable, and real-time digital experience.

---

## 🔧 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-Time:** Socket.io
- **Authentication:** JWT + Role-Based Access Control
- **Payments:** Razorpay Integration
- **Additional Tools:** QR Code Generator, Audio Notifications, Charts for Analytics

---

## 🚀 Features

### 👤 User Panel
- Online reservation (Hut/Table)
- Event booking (e.g., party or function)
- Order food online
- Razorpay payment gateway integration
- Loyalty system with **Points and Badges**
- Submit reviews and feedback
- QR Code-based quick offline order

### 🛠️ Admin Panel
- Dashboard with complete insights and analytics
- Manage staff, bookings, menus, events, and reviews
- Real-time order and event updates via **Socket.io**
- Audio notifications for new orders or reservations
- Role-based login with secure access control

### 👨‍🍳 Staff Panel
- View assigned tasks or orders in real-time
- Notifications for new bookings or updates
- Manage table service and order status

---

## 📸 Screenshots

<div align="center">
   <img src="https://github.com/user-attachments/assets/79e5ea86-3930-44ab-aa3b-3f0b1a4e576b" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/5964506b-bb86-41d4-88e2-e4776cf34c48" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/9e871430-5fc1-491f-8ff1-9405fd6030d2" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/bc95cdb1-5b06-41a9-ba65-cf903d48d468" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/1d284b92-5003-4b0a-b150-9c050dce1f5a" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/399700fe-c4b5-45f0-8476-ba1218f04ed2" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/5671b5c2-d2f6-4755-9002-3f1f3de38060" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/224e17f9-aac5-4387-981c-aea7768dd7ca" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/298ddc4a-ed9d-4d60-9e03-033ab53dc0db" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/d1bfb168-3288-4bff-ae26-0b07bcc7f46b" alt="Restaurant management website" width="330" />
   <img src="https://github.com/user-attachments/assets/8c64b1ed-3860-4328-9d2b-4b8357f18124" alt="Restaurant management website" width="330" />
</div>

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js
- MongoDB
- Razorpay account (for payment testing)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/HARIOM317/Restaurant-Management-System.git
   cd frontend

2. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install

3. **Environment Variables**
   Create a .env file in the /server directory with the following:

   - frontend .env
     
        ```env
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      RAZORPAY_KEY_ID=your_key_id
      RAZORPAY_KEY_SECRET=your_key_secret

   - backend .env
   - 
     ```env
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      RAZORPAY_KEY_ID=your_key_id
      RAZORPAY_KEY_SECRET=your_key_secret

4. **Start the frontend**

   ```bash
   cd frontend
   npm start

5. **Start backend server**

   ```bash
   cd backend
   npm start

---

## 📈 Admin Dashboard

The admin dashboard provides visual insights into:

   -Total Orders

   - Total Revenue

   - Upcoming Events

   - User Feedback

   - Real-time activity log with audio cues

---

## 📢 Real-time Capabilities

   - Socket.io is used for real-time updates between users, staff, and admin.

   - Audio alerts notify staff/admin of important events like new bookings, order status updates, etc.

---

## 🔐 Authentication

Role-based login system:

   - Admin

   - Staff

   - User

Secure access and routing based on roles ensure data privacy and operational efficiency.

---

## 📱 QR Code Ordering

   - Each table/hut has a unique QR code.

   - Scan to place offline orders directly via the mobile interface.

---

## 💳 Payments

Integrated with Razorpay to securely handle online payments for:

   - Food orders

   - Event bookings

   - Reservation fees

---

## ⭐ Future Enhancements

   - Customer-facing mobile app (Flutter-based)

   - Inventory and kitchen management

   - SMS/Email notifications

   - AI-based sales forecasting

---

## 📬 Feedback

If you find this project useful or have suggestions, feel free to raise an issue or contribute.

---

## 🧑‍💻 Author

**Hariom Singh Rajput** : Founder of GitNexa
   - B.Tech CSE | Software Developer | MERN Stack | DSA with C++
   - Portfolio | LinkedIn | GitHub

**Harsh Kamde** : Founder of TrySoft
   - B.Tech CSE | Software Developer | MERN Stack | DSA with C++
   - Portfolio | LinkedIn | GitHub

---

## 📝 License
This project is licensed under the MIT License.

---

## 📞 Contact

🌐 Website: https://www.skyhutcafe.com

📧 Email: support@skyhutcafe.com

---

"Innovation distinguishes between a leader and a follower." – Steve Jobs
