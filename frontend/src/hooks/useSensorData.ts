import { useState, useEffect } from 'react';
import { listenToLatestReadings, listenToSensorInfo } from '../services/firebase';

export function useSensorData(sensorId: string) {
  const [readings, setReadings] = useState<any[]>([]);
  const [sensorInfo, setSensorInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Listen to sensor info
    const unsubscribeInfo = listenToSensorInfo(sensorId, (data) => {
      setSensorInfo(data);
    });

    // Listen to latest readings
    const unsubscribeReadings = listenToLatestReadings(sensorId, 10, (data) => {
      if (data) {
        const readingsArray = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          ...value
        }));
        setReadings(readingsArray);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeInfo();
      unsubscribeReadings();
    };
  }, [sensorId]);

  return { readings, sensorInfo, loading, error };
}