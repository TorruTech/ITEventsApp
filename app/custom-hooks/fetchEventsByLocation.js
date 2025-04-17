import { useState, useEffect } from 'react';

const API_URL = 'https://iteventsbackend.onrender.com';

const fetchEventsByLocation = async (locationId) => {
  const URL = `${API_URL}/api/events/location/${locationId}`;

  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return await response.json();
};

export const useFetchEventsByLocation = (locationId) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchEventsByLocation(locationId, signal);
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
  }, [locationId]);

  return { events, loading, error };
};
