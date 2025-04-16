import { useState, useEffect } from 'react';

const fetchEvent = (eventId) => {
    const URL = `https://dc45-188-227-144-33.ngrok-free.app/event/${eventId}`;
    
    return fetch(URL)
        .then(response => response.json()) 
        .then(data => data)
        .catch(error => {
            console.error("Error fetching event:", error);
        });
}

export const useFetchEvent = (eventId) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      
        fetchEvent(eventId)
            .then(data => {
                setEvent(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [eventId]); 
    return { event, loading, error };
};
