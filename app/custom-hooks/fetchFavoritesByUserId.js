import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://iteventsbackend.onrender.com/api/favorites';

export const useFetchFavoriteEvents = () => {
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem("userId");
        const res = await fetch(`${API_URL}/user/${userId}/events`);
        const data = await res.json();
        setFavoriteEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchFavorites();
    }, []);
  
    return { favoriteEvents, loading, error, refetch: fetchFavorites };
  };
  