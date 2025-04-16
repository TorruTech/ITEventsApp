import { useState, useEffect } from 'react';

const API_URL = 'https://iteventsbackend.onrender.com/api/events'; 

export const fetchCountByLocation = async () => {
  try {
    const response = await fetch(`${API_URL}/count-by-location`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error al obtener el conteo de eventos por localización:", error);
    return [];
  }
};

export const useFetchCountByLocation = () => {
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const data = await fetchCountByLocation();
        setCounts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return { counts, loading, error };
};
