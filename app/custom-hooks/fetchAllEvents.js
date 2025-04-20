import { useState, useEffect } from 'react';

const API_URL = 'https://iteventsbackend.onrender.com';

const fetchAllEvents = async (signal) => {
  const response = await fetch(`${API_URL}/api/events`, { signal });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

export const useFetchAllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchAllEvents(signal);
        setEvents(data);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvents();

    return () => controller.abort(); 
  }, []);

  return { events, loading, error };
};
