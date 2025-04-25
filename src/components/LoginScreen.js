import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";
import { useNotification } from "./NotificationContext";

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const notify = useNotification();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      
      if (!res.ok) throw new Error("Login failed");
      console.log(res)
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch {
      notify("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField label="Username" fullWidth margin="normal" value={credentials.username} onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
        <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
      </Paper>
    </Container>
  );
}
