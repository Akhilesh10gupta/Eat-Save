import { useState, useEffect } from 'react';

// Helper: Reverse geocode using OpenStreetMap Nominatim
async function reverseGeocode(lat, lon) {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        return data.display_name || '';
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        return '';
    }
}

// Helper: Extract 6-digit pin code from address string
function extractPinCode(address) {
    const match = address && address.match(/\b\d{6}\b/);
    return match ? match[0] : null;
}

export default function useGeolocation() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                const addr = await reverseGeocode(latitude, longitude);
                setAddress(addr);
                setPinCode(extractPinCode(addr));
                setLoading(false);
            },
            (err) => {
                console.error('Error reverse geocoding:', err);
                setError('Unable to retrieve your location');
                setLoading(false);
            }
        );
    }, []);

    return { ...location, address, pinCode, loading, error };
} 