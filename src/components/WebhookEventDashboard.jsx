import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WebhookEventDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => {
        console.error("Error fetching events:", err);
      })
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Webhook Event Dashboard
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
                <TableCell>{event.eventType}</TableCell>
                <TableCell>{event.source}</TableCell>
                <TableCell>{event.ip}</TableCell>
                <TableCell>
                  <Chip
                    label={event.status || "received"}
                    color={event.status === "error" ? "error" : "success"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => navigate(`/event/${event.id}?token=${event.token}`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1976d2',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    View
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
