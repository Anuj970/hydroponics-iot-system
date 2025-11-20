import { useEffect, useState } from 'react';
import { fetchSensorData } from '../services/api';
import type { SensorReading } from '../types';

const useSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorReading[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let active = true;
    const getData = async () => {
      try {
        const data = await fetchSensorData();
        if (active) setSensorData(data);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    getData();
    const interval = setInterval(getData, 5000); // poll
    return () => { active = false; clearInterval(interval); };
  }, []);

  return { sensorData, loading, error };
};

export default useSensorData;