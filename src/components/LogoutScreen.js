// src/components/LogoutButton.js
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button color="error" variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
}
