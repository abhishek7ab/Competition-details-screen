# Feedants - Competition Details Screen

This project is a full-stack application built for the Feedants Full Stack Internship Assignment. It displays an event page for a competition called Classical Dance Solo 2026. Users can view competition information, register, make a test payment, watch videos, and submit their dance video entry.

---

## Features

- **Dark Mode and Light Mode**: You can switch between dark and light themes using the theme button in the header.
- **Works on Mobile and Desktop**: The layout automatically adjusts. It looks like a mobile app on small screens and expands to a three-column layout on computer screens.
- **Live Countdown Timer**: Shows the remaining days, hours, minutes, and seconds until registration closes.
- **Available Spots Counter**: Shows how many spots are left in real time (for example, 19 spots left).
- **Registration and Payment**: The payment popup is a demo simulator only; it does not process or verify real payments. Production registration is disabled until gateway verification is integrated.
- **Video Player**: You can watch the judge introduction video and past winners' dance videos directly inside the app.
- **Video Submission**: After registering, the bottom button changes to Upload Submission where you can enter a video title and link.
- **English and Hindi Support**: You can switch the text between English and Hindi using the language button in the header.
- **Testing Tools**: A settings button in the header lets you switch between test users (Pooja Sharma and Rahul Verma) and reset all data back to the start.

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

The backend will start at: `http://localhost:5000`

For local development, if `MONGODB_URI` is not set, the backend uses a temporary in-memory MongoDB database. **Data is erased when the process stops.** For persistent data, configure `MONGODB_URI` in `backend/.env`. Production startup requires a valid `MONGODB_URI` and will not fall back to temporary storage.

### Step 2: Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run web
```

This will open the app in your browser at: `http://localhost:8081`

---

## Environment configuration

Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` to your MongoDB connection string. Keep credentials out of Git.

Demo-only controls are available in development. They are disabled when `NODE_ENV=production`. The current demo user-switching flow is not authentication; the API accepts user IDs and is intended only for the assignment demo.

## Current limitations / production work

- Payment is simulated in development. Real payment gateway order creation, server-side signature/webhook verification, refunds, and payment reconciliation are not implemented. Registration endpoints return 503 in production until real payment verification is added.
- Authentication and authorization are not implemented. Do not expose the demo APIs to real users.
- Registration spot reservation is guarded by an atomic conditional update and compensates if the registration insert fails. For full crash-safe atomicity, use a MongoDB replica set and a transaction-based reservation workflow.
- Demo lifecycle override/reset endpoints are disabled in production.
- Submission input validation and lifecycle checks are enforced by the backend.

## Technologies Used

- **Frontend**: React Native, Expo Web
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with automatic in-memory fallback)
- **Icons**: Custom inline SVG icons

---

## Project Structure

- `backend/`: Contains the server code, database models, and API routes for registration and submissions.
- `frontend/`: Contains the React Native user interface, screens, cards, buttons, and styles.
- `README.md`: Project documentation and run instructions.

---

## Testing User Flows

Click the settings gear icon at the top right to test different flows:

1. **Test Registration**: Switch to **Rahul Verma** (unregistered user). Click **Register Now**, complete the payment popup, and verify that the spots count decreases and your status changes to Registered.
2. **Test Submission**: Switch to **Pooja Sharma** (already registered user). Click **Upload Submission**, fill in the video details, and submit.
3. **Reset Data**: Click **Reset Demo Data** to return all spots and users to the default state.

---

## Author

- **Name**: Abhishek
- **Role**: Full Stack Development Intern Assignment
- **Company**: Feedants
