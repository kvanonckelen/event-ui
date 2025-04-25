# Webhook Dashboard UI

A React-based admin dashboard for managing webhook integrations, configuring notifications, and securely viewing event payloads.

## 🚀 Features

- 🔐 JWT-based authentication
- 📬 Manage SMTP, Twilio, and recipient settings
- 📊 View webhook events with detail inspection
- ✅ Toggle email/SMS notifications
- 🔄 Preload and share settings across components

## 🧱 Project Structure

```
src/
├── components/         # React components (Dashboard, Viewer, etc.)
├── context/            # React Context for settings
├── models/             # Sequelize models (Event, etc.)
├── pages/              # Login, Dashboard, Event detail views
├── utils/              # Helper functions (fetch, auth, etc.)
└── App.jsx             # Main app with routing
```

## 🛠️ Getting Started

```bash
npm install
npm start
```

Runs on: `http://localhost:3000`

> Make sure the backend API is running on `http://localhost:3001` or proxy is set in `vite.config.js` / `package.json`

## 📦 Environment Variables
Create a `.env` file if needed (for frontend tokens or API base override):

```
REACT_APP_API_BASE=http://localhost:3001
```

## 🔗 Backend API
See the [backend README](../event-api/README.md) for API routes and details.

## 📄 License
MIT © Kevin Van Onckelen
