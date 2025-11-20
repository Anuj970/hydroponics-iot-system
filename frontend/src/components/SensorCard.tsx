import React from 'react';

interface SensorCardProps {
    label: string;
    value: number;
    unit: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ label, value, unit }) => {
    return (
        <div className="sensor-card">
            <h3>{label}</h3>
            <p>{value} {unit}</p>
        </div>
    );
};

export default SensorCard;