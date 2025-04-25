import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WebhookNotifierControlPanel from "./components/WebhookNotifierControlPanel";
import WebhookEventDashboard from "./components/WebhookEventDashboard";
import LoginScreen from "./components/LoginScreen"; // a basic login page
import ProtectedRoute from "./components/ProtectedRoute";
import { NotificationProvider } from "./components/NotificationContext";
import EventViewer from "./components/EventViewer"; // a basic event viewer
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <NotificationProvider>
    
    <Router>
    <Navigation/>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <WebhookNotifierControlPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <WebhookEventDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/event/:id" element={<EventViewer />} />
        {/* Route path="*" element={<Navigate to="/" />}/> */}
      </Routes>
    </Router>
    </NotificationProvider>
  );
}
