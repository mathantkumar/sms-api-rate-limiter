# SMS Messaging Insights Dashboard with Rate Limiting

## Overview

The Messaging Insights Dashboard is a web application designed to visualize and analyze SMS sending activities, track usage, and monitor rate limit violations. It allows users to send SMS messages, view statistics, and gain insights into their messaging activities.

## Features

- Send SMS messages to phone numbers.
- View SMS usage statistics, including the number of messages sent in the last minute and total messages sent today.
- Monitor rate limit violations to ensure compliance with messaging limits.
- User-friendly interface with visualizations using charts.

## Technologies Used

- **Frontend**: 
  - React.js
  - Chart.js (for data visualization)
  - Axios (for API calls)
  - React Toastify (for notifications)
  
- **Backend**: 
  - Node.js
  - Express.js
  - SQLite (for data storage)

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (Node package manager)
- SQLite (for the database)

### Installation

1. Clone the repository: backend and frontend in a folder
   ```bash
   git clone https://github.com/mathantkumar/sms-dashboard.git 
   git clone https://github.com/mathantkumar/sms-api-rate-limiter.git
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Setting Up the Database

The application uses SQLite for data storage. The database schema will be created automatically when you run the backend server for the first time.

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run serve
   ```
   The server will run on `http://localhost:5020`.

2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

### API Endpoints

- `POST /send-sms`: Send an SMS message.
- `GET /stats`: Get SMS usage statistics.
- `GET /violations`: Get rate limit violations.

### Usage

1. Once the website is launched in the main page you can see button called 'Try It Now'. Click the button to view Dashboard.
2.  Enter a phone number in the input field and click "Send SMS" to send an SMS message.
3. Monitor SMS usage and rate limit violations displayed on the dashboard.
