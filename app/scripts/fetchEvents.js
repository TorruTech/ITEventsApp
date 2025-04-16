import { useState, useEffect } from 'react';

const fetchEvents = async () => {
    const URL = `https://dc45-188-227-144-33.ngrok-free.app/event`;
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

export const useFetchEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    
        fetchEvents()
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []); 

    return { events, loading, error };
};
