# 🏆 Feedants - Competition Details Screen

Welcome to the **Feedants Competition Details Screen**! 

This is a complete full-stack web and mobile application built for the Feedants Full Stack Internship Assignment. It shows all the details of an upcoming competition (like Classical Dance Solo 2026), allows users to register, pay, watch performance videos, and upload their submissions.

---

## 📱 What Can You Do in This App?

- 🌓 **Dark & Light Mode**: Toggle between dark and light themes using the sun/moon button at the top.
- 💻 **Desktop & Mobile Friendly**: Looks like an easy-to-use mobile app on your phone, and expands into a clean 3-column dashboard on your computer screen.
- ⏳ **Live Countdown Timer**: Watch the countdown timer tick down live until registration closes.
- 🎟️ **Live Spot Counter**: See how many seats are left in real time (e.g., *19 spots left*).
- 💳 **Register & Mock Payment**: Click "Register Now" to try a simulated Razorpay payment popup and book a spot.
- 🎬 **Watch Videos**: Click on the Judge's card to watch the intro video, or tap any Previous Winner card to watch their winning dance routine.
- 📤 **Submit Your Dance Entry**: Once registered, the bottom button automatically changes to "Upload Submission" so you can paste your video link.
- 🌐 **English & Hindi**: Switch the language anytime with the **ENG / हिंदी** button in the header.
- ⚙️ **Evaluator Test Tools**: Click the small settings gear icon (⚙️) at the top to:
  - Switch users between **Pooja Sharma** (already registered user) and **Rahul Verma** (new unregistered user).
  - Test different stages of the competition (Open, Closed, Submissions, Completed).
  - Reset all data back to the original starting state with one click.

---

## 🚀 How to Run the App (Quick 2 Steps)

Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Start the Backend Server

Open a terminal window and run:

```bash
cd backend
npm install
npm start
```

- The backend server will start on **http://localhost:5000**.
- **Note**: You don't even need MongoDB installed! It automatically uses a built-in in-memory database if MongoDB is not running locally.

### Step 2: Start the Frontend App

Open a second terminal window and run:

```bash
cd frontend
npm install
npm run web
```

- Your browser will open **http://localhost:8081**.
- You can now interact with the full competition screen!

---

## 🛠️ Built With

- **Frontend**: React Native + Expo (runs smoothly on Web browsers, Android, and iOS).
- **Backend**: Node.js + Express.js (fast API server).
- **Database**: MongoDB (with automatic in-memory fallback for instant zero-setup testing).
- **Icons**: Clean custom inline SVG icons (works everywhere without missing font icons).

---

## 📂 Project Folders Explained Simply

```
Competition Details screen/
│
├── backend/                  # Everything that handles data and payments
│   ├── src/
│   │   ├── config/           # Database connection setup
│   │   ├── controllers/      # Handles registration, countdown, and submissions
│   │   ├── models/           # Structure for competition, users, and tickets
│   │   ├── routes/           # API URLs
│   │   ├── seed.js           # Default competition data (rules, dates, rewards)
│   │   └── server.js         # Starts the backend server
│   └── package.json
│
├── frontend/                 # Everything you see on the screen
│   ├── src/
│   │   ├── components/       # Cards, buttons, timer, tabs, modals, and SVG icons
│   │   ├── constants/        # Colors, fonts, and light/dark theme styles
│   │   └── services/         # Connects frontend to the backend API
│   ├── App.js                # Main page connecting all components
│   └── package.json
│
└── README.md                 # This guide!
```

---

## 🧪 Testing User States

To make testing super easy for evaluators, click the **⚙️ gear icon** at the top right:

1. **Test Registration & Payment**: Select **Rahul Verma** -> scroll to the bottom -> click **Register Now • ₹99** -> click **Pay ₹99 Now** -> watch spots drop from 19 to 18 and state change to Registered!
2. **Test Video Upload**: Select **Pooja Sharma** -> click **Upload Submission** -> paste any video title/URL -> submit.
3. **Reset**: Click **Reset Demo Data** to return to the original 19 spots state anytime.

---

## 👨‍💻 Author
- **Abhishek**
- Full Stack Development Internship Assignment for **Feedants**
