import React from "react";

interface SensorCardProps {
  sensorName: string;
  sensorType: "temp" | "humidity" | "pH";
  unit: string;
  value: number | null;   // Live value from Firebase
}

// Thresholds for sensor alerts
const thresholds: Record<string, { min: number; max: number }> = {
  temp: { min: 18, max: 28 },
  humidity: { min: 50, max: 80 },
  pH: { min: 5.5, max: 7.0 }
};

export function SensorCard({ sensorName, sensorType, unit, value }: SensorCardProps) {
  
  // Alert color logic
  const getStatusColor = (val: number | null) => {
    if (val === null) return "#6b7280"; // gray when no data

    const { min, max } = thresholds[sensorType];

    if (val < min || val > max) {
      return "#ef4444"; // red - warning
    }

    return "#10b981"; // green - normal
  };

  return (
    <div style={cardWrapper}>
      
      {/* Header */}
      <div style={headerRow}>
        <h3 style={title}>{sensorName}</h3>

        {/* Status dot */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: getStatusColor(value),
            boxShadow: `0 0 8px ${getStatusColor(value)}`
          }}
        />
      </div>

      {/* Sensor Value */}
      <p style={valueStyle}>
        {value !== null ? value : "—"}
        <span style={unitStyle}>{unit}</span>
      </p>

    </div>
  );
}

/* ---------- Styles ---------- */

const cardWrapper: React.CSSProperties = {
  background: "rgba(30, 41, 59, 0.65)",
  padding: "1.5rem",
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  display: "flex",
  flexDirection: "column"
};

const headerRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  color: "#94a3b8",
  fontWeight: 600
};

const valueStyle: React.CSSProperties = {
  fontSize: "2.2rem",
  fontWeight: 700,
  marginTop: "1rem",
  color: "#f8fafc"
};

const unitStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#64748b",
  marginLeft: 6
};
