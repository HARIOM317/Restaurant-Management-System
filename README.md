# Sky Hut Cafe – Backend 🛠️
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/HARIOM317/Restaurant-Management-System)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-16.x-blue.svg)](https://nodejs.org/)

**Backend API for Sky Hut Cafe | Built with Node.js + Express.js + MongoDB**

---

## 📌 Overview

This is the **backend service** for Sky Hut Cafe – a complete restaurant management system. It handles API requests, user authentication, real-time order tracking, payment processing, and role-based control for Admin, Staff, and Users.

---

## 🔧 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt
- **Payments:** Razorpay
- **Realtime:** Socket.io
- **Others:** dotenv, CORS, QR Code, Audio Events

---

## 🔐 Authentication and Access

- Secure JWT-based authentication
- Role-based access for:
  - Admin
  - Staff
  - User

---

## 🚀 Key Functionalities

- User registration, login, and profile
- Admin and Staff creation
- CRUD for menu, orders, events, bookings
- Real-time updates via Socket.io
- Audio notifications for orders/reservations
- Razorpay payment integration

---

## 📂 API Structure

- `auth/` – User/Admin/Staff login and registration
- `orders/` – Place and manage food orders
- `reservations/` – Book tables or huts
- `events/` – Book and manage events
- `reviews/` – Post and fetch reviews
- `admin/` – Dashboard data and insights

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16.x or above)
- MongoDB

### Installation

```bash
# Clone repository
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=5007
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Run the Server

```bash
npm start
```

---

## 🧠 Admin Dashboard API

Returns:
- Total Users
- Orders Summary
- Event Bookings
- Real-time activity feed
- Graph-ready analytics

---

## 🔄 Real-time Updates

- Events like new orders, reservations, and updates are pushed in real-time to connected clients (admin and staff) via **Socket.io**.
- Plays notification sounds server-side when new activities are received.

---

## 💳 Payment Integration

- Razorpay API integrated to securely manage:
  - Food orders
  - Hut/table reservations
  - Event bookings

---

## 📞 Contact

🌐 Website: [https://www.skyhutcafe.com](https://www.skyhutcafe.com)
📧 Email: [support@skyhutcafe.com](mailto:support@skyhutcafe.com)

---

> "Innovation distinguishes between a leader and a follower." – Steve Jobs
