import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

export const fetchSensorData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sensors`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        throw error;
    }
};

export const toggleRelay = async (state) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/relay`, { state });
        return response.data;
    } catch (error) {
        console.error('Error toggling relay:', error);
        throw error;
    }
};