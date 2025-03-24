# SkyHut Cafe and Restaurant

Welcome to the SkyHut Cafe and Restaurant project! This README provides instructions for setting up and running the project in both development and production environments.

## Table of Contents

1. Project Overview
2. Features
3. Tech Stack
4. Getting Started
   - Development Setup
   - Production Setup
5. Branches
6. Deployment
7. Contributing
8. License

## Project Overview

SkyHut Cafe and Restaurant is a web application that provides users with an interactive platform to explore our menu, make reservations, and benefit from various offers and discounts.

## Features

- Chatbot for user queries
- Dashboard for staff members with role management
- Notifications for orders, events, and reservations
- Pre-payment for bookings
- Automated discounts and offers
- Instagram-based discounts
- Cancellation reasons
- QR code for offline orders
- Loyalty points system

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Deployment: Vercel, GitHub
- CI/CD: GitHub Actions

## Getting Started

## Development Setup

1. Clone the Repository:
   git clone https://github.com/harsh-kamde/skyhut.git
   cd skyhut

2. Checkout the Development Branch:
   git checkout development

3. Install Dependencies:
   npm install

4. Set Environment Variables:

   - Create a .env file in the root directory and add necessary environment variables.

5. Run the Development Server:
   npm run dev

6. Access the Application:
   - Open your browser and navigate to http://localhost:3000

## Production Setup

1. Clone the Repository:
   git clone https://github.com/harsh-kamde/skyhut.git
   cd skyhut

2. Checkout the Main Branch:
   git checkout main

3. Install Dependencies:
   npm install

4. Set Environment Variables:

   - Create a .env file in the root directory and add necessary environment variables.

5. Build the Application:
   npm run build

6. Start the Production Server:
   npm start

Branches

- main: Production-ready code.
- development: Development and testing of new features.
- feature/<feature-name>: Individual feature branches.

## Deployment

## Continuous Deployment with Vercel

1. Connect GitHub Repository to Vercel:

   - In Vercel, create a new project and link it to your GitHub repository.
   - Vercel will automatically deploy branches.

2. Environment Variables:

   - Set environment variables in Vercel for both development and production branches.

3. Custom Domains:
   - Assign custom domains to the production branch in Vercel settings.

## Contributing

We welcome contributions from the community. Please follow these steps:

1. Fork the repository.
2. Create a new branch from development.
3. Make your changes.
4. Open a pull request to the development branch.

## Developer & Team

1. Hariom Singh Rajput - Founder of GitNexa
2. Harsh Kamde - Founder of TrySoft

## License

This project is licensed under the MIT License. See the LICENSE file for details.
