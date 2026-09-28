# Feedants - Competition Details Screen

This project is a full-stack application built for the Feedants Full Stack Internship Assignment. It displays an event page for a competition called Classical Dance Solo 2026. Users can view competition information, register, make a test payment, watch performance videos, and submit their dance video entry.

---

## What This Project Actually Does (How It Works)

Here is a step-by-step explanation of what the application does and how a user interacts with it:

### 1. Dynamic Competition Information
When you open the page, the application fetches all competition data directly from the Node.js backend and MongoDB database. It is not hardcoded. The page shows:
- The competition title, category, and fee (Rs. 99)
- Total prize pool (Rs. 2,000) with 1st Prize at Rs. 1,000 and breakdown from 1st to 6th rank
- Judge profile (Manju Dubey, Kathak expert) with background experience
- Key competition dates (Registration close date, Submission window, Result date)
- Competition description, judging parameters with percentage weights, and rules
- Previous winners and frequently asked questions

### 2. Live Countdown and Spot Tracking
- A live countdown timer counts down the days, hours, minutes, and seconds until registration closes.
- An available spots counter displays real-time capacity (such as "19 spots left" out of 20 total spots).
- The backend uses atomic database queries so two users cannot book the same spot simultaneously.

### 3. Registration and Payment Flow
- When an unregistered user visits the page, the main action button says "Register Now - Rs. 99".
- Clicking this button opens a test Razorpay payment popup.
- When the user confirms payment, the backend creates a registration record, reduces the available spots from 19 to 18, and updates the user state.

### 4. Video Submission Flow
- Once a user is registered, the application detects their status immediately.
- The action button automatically changes from "Register Now" to "Upload Submission".
- During the submission period, the participant can click this button, enter their dance performance title and video link, and submit it for jury review.

### 5. In-App Video Player
- Users can click on the Judge card to watch the judge introduction video.
- Users can click on any Previous Winner card to watch their winning performance directly in an in-app video popup.

### 6. English and Hindi Language Toggle
- Users can click the language button in the header (ENG / Hindi) at any time.
- All headings, rules, dates, judging parameters, and buttons immediately translate into fluent English or Hindi.

### 7. Dark Mode and Light Mode
- Users can toggle between Dark Mode and Light Mode with a single click. The entire color palette, cards, and text adjust for comfortable reading.

### 8. Mobile and Desktop Adaptive Layout
- On mobile phones (screen width under 900px), the app displays a clean mobile layout with a bottom navigation bar.
- On computer screens (screen width 900px and above), the layout automatically expands into a three-column dashboard with a left sidebar for navigation, a center column for competition details, and a sticky action card on the right.

### 9. Evaluator Testing Tools
- A settings gear icon in the header allows reviewers to test the entire application without needing to create accounts:
  - Switch User: Toggle between Pooja Sharma (pre-registered user) and Rahul Verma (unregistered user).
  - Lifecycle Override: Manually test how the screen looks when registration is open, closed, or completed.
  - Reset Demo Data: One-click button to reset all spots, registrations, and users back to the clean initial state.

---

## Features Summary

- Dark Mode and Light Mode toggle
- Automatic responsive layout for both mobile and desktop screens
- Live countdown timer
- Real-time spot counter and capacity protection
- Simulated Razorpay payment flow
- In-app video player for judge and winner videos
- Video submission modal for registered participants
- English and Hindi bilingual support
- Evaluator toolbar to switch user profiles and reset demo data

---

## How to Run the Project

You only need Node.js installed on your computer.

### Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
npm start
```

The backend server will start at: `http://localhost:5000`

Note: You do not need to install MongoDB separately. If MongoDB is not running on your computer, the backend will automatically use a built-in temporary database for local testing.

### Step 2: Start the Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run web
```

This will open the app in your browser at: `http://localhost:8081`

---

## Technologies Used

- **Frontend**: React Native, Expo Web
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with automatic temporary in-memory database fallback)
- **Icons**: Custom inline SVG icons

---

## Project Structure

```
Competition Details screen/
│
├── backend/
│   ├── src/
│   │   ├── config/           # Database connection and in-memory fallback
│   │   ├── controllers/      # Handles registration, countdown, and submissions
│   │   ├── models/           # Data models for competition, users, and registrations
│   │   ├── routes/           # REST API endpoints
│   │   ├── seed.js           # Default competition seed data
│   │   └── server.js         # Express server startup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # UI cards, buttons, modals, sidebar, and SVG icons
│   │   ├── constants/        # Theme colors (light and dark mode)
│   │   └── services/         # API connection functions
│   ├── App.js                # Main application container and routing
│   └── package.json
│
└── README.md                 # Project documentation and guide
```

---

## How to Test the Project

Click the settings gear icon at the top right:

1. **Test Registration**: Switch to **Rahul Verma** (unregistered user). Scroll down and click **Register Now - Rs. 99**. Complete the test payment popup. Notice that spots drop from 19 to 18 and the button changes to Registered.
2. **Test Submission**: Switch to **Pooja Sharma** (already registered user). Click **Upload Submission**, enter your video title and URL, and submit.
3. **Reset**: Click **Reset Demo Data** to return all spots and users to the clean starting state.

---

## Author

- **Name**: Abhishek
- **Role**: Full Stack Development Intern Assignment
- **Company**: Feedants
