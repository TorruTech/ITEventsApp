import { useState, useEffect } from 'react';

const API_URL = 'https://iteventsbackend.onrender.com'; 

const fetchEvent = async (eventId) => {
  const response = await fetch(`${API_URL}/api/events/${eventId}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

export const useFetchEvent = (eventId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    const controller = new AbortController(); // para cancelar si se desmonta
    const signal = controller.signal;

    const loadEvent = async () => {
      setLoading(true);
      try {
        const data = await fetchEvent(eventId, signal);
        setEvent(data);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvent();

    return () => {
      controller.abort(); // cancelación si el componente se desmonta
    };
  }, [eventId]);

  return { event, loading, error };
};
