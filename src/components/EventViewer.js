// src/components/EventViewer.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';

export default function EventViewer() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Server error: ${res.status} - ${text}`);
          }
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error('Error loading event', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6">Event not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Event Detail View</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="subtitle1">ID: {event.id}</Typography>
        <Typography variant="subtitle2">Source: {event.source}</Typography>
        <Typography variant="subtitle2">Event Type: {event.eventType}</Typography>
        <Typography variant="subtitle2">Timestamp: {new Date(event.timestamp).toLocaleString()}</Typography>
        <Typography variant="subtitle2">IP: {event.ip}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Payload</Typography>
        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f7f7f7', mt: 1 }}>
          <pre>{JSON.stringify(event.payload, null, 2)}</pre>
        </Paper>

        <Typography variant="h6" sx={{ mt: 3 }}>Headers</Typography>
        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f7f7f7', mt: 1 }}>
          <pre>{JSON.stringify(event.headers, null, 2)}</pre>
        </Paper>
      </Paper>
    </Container>
  );
}



