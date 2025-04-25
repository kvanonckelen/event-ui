import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useNotification } from "./NotificationContext";

export default function WebhookNotifierControlPanel() {
  const notify = useNotification();
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [recipients, setRecipients] = useState({ sms: "", email: "" });
  const [smtp, setSmtp] = useState({ host: "", port: "", useAuth: false, user: "", pass: "" });
  const [twilio, setTwilio] = useState({ sid: "", token: "", from: "" });
  const [enabled, setEnabled] = useState({ sms: true, email: true });
  const [activeTab, setActiveTab] = useState(0);


  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const payload = { auth, recipients, smtp, twilio, enabled };

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save settings");
      notify("Settings saved successfully");
    } catch (err) {
      notify("Error saving settings: " + err.message);
    }
  };

  const handleSendTestEmail = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/send-test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ smtp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Send failed");
      notify("✅ Test email sent successfully");
    } catch (err) {
      notify("❌ Failed to send test email: " + err.message);
    }
  };

  const handleTabChange = async (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 2) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("/api/settings/smtp", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data?.value) {
          setSmtp(prev => ({ ...prev, ...data.value }));
        }
      } catch (err) {
        console.error("Failed to load SMTP settings", err);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Webhook Notifier Configuration
        </Typography>
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
        <Tab label="Authentication" />
        <Tab label="Recipients" />
        <Tab label="SMTP" />
        <Tab label="Twilio" />
        <Tab label="Notifications" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {activeTab === 0 && (
          <Box>
            <TextField label="Username" fullWidth margin="normal" value={auth.username} onChange={e => setAuth({ ...auth, username: e.target.value })} />
            <TextField label="Password" type="password" fullWidth margin="normal" value={auth.password} onChange={e => setAuth({ ...auth, password: e.target.value })} />
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <TextField label="SMS Recipient" fullWidth margin="normal" value={recipients.sms} onChange={e => setRecipients({ ...recipients, sms: e.target.value })} />
            <TextField label="Email Recipient" fullWidth margin="normal" value={recipients.email} onChange={e => setRecipients({ ...recipients, email: e.target.value })} />
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <TextField label="SMTP Host" fullWidth margin="normal" value={smtp.host} onChange={e => setSmtp({ ...smtp, host: e.target.value })} />
            <TextField label="SMTP Port" fullWidth margin="normal" value={smtp.port} onChange={e => setSmtp({ ...smtp, port: e.target.value })} />
            <FormControlLabel
              control={
                <Switch checked={smtp.useAuth} onChange={e => setSmtp({ ...smtp, useAuth: e.target.checked })} />
              }
              label="Use SMTP Authentication"
            />
            {smtp.useAuth && (
              <>
                <TextField label="SMTP Username" fullWidth margin="normal" value={smtp.user} onChange={e => setSmtp({ ...smtp, user: e.target.value })} />
                <TextField label="SMTP Password" type="password" fullWidth margin="normal" value={smtp.pass} onChange={e => setSmtp({ ...smtp, pass: e.target.value })} />
              </>
            )}
            <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>Save</Button>
            <Button variant="outlined" onClick={handleSendTestEmail}>Send Test Email</Button>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <TextField label="Twilio SID" fullWidth margin="normal" value={twilio.sid} onChange={e => setTwilio({ ...twilio, sid: e.target.value })} />
            <TextField label="Twilio Token" type="password" fullWidth margin="normal" value={twilio.token} onChange={e => setTwilio({ ...twilio, token: e.target.value })} />
            <TextField label="Twilio From Number" fullWidth margin="normal" value={twilio.from} onChange={e => setTwilio({ ...twilio, from: e.target.value })} />
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        )}

        {activeTab === 4 && (
          <Box>
            <FormControlLabel
              control={<Switch checked={enabled.sms} onChange={e => setEnabled({ ...enabled, sms: e.target.checked })} />}
              label="Enable SMS Notifications"
            />
            <FormControlLabel
              control={<Switch checked={enabled.email} onChange={e => setEnabled({ ...enabled, email: e.target.checked })} />}
              label="Enable Email Notifications"
            />
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        )}


      </Box>
    </Container>
  );
}
