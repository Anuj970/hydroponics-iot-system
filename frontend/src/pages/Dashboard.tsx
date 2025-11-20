import React, { useState, useEffect, useRef } from 'react';
import { getRole } from '../services/auth';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  icon: string;
  status: 'normal' | 'warning' | 'critical';
  threshold: { min: number; max: number };
}

interface LogEntry {
  time: string;
  type: 'sensor' | 'control' | 'alert';
  details: string;
  value: string;
}

export default function Dashboard() {
  const role = getRole();
  const [sensors, setSensors] = useState<SensorData[]>([
    { id: '1', name: 'Temperature', value: 24.5, unit: '°C', icon: '🌡️', status: 'normal', threshold: { min: 18, max: 28 } },
    { id: '2', name: 'Humidity', value: 65, unit: '%', icon: '💧', status: 'normal', threshold: { min: 50, max: 80 } },
    { id: '3', name: 'pH Level', value: 6.8, unit: 'pH', icon: '🧪', status: 'normal', threshold: { min: 5.5, max: 7.0 } },
    { id: '4', name: 'EC Level', value: 1.2, unit: 'mS/cm', icon: '⚡', status: 'normal', threshold: { min: 0.8, max: 1.8 } }
  ]);

  const [relays, setRelays] = useState([
    { id: '1', name: 'Water Pump', status: true, icon: '💧' },
    { id: '2', name: 'Grow Light', status: false, icon: '💡' },
    { id: '3', name: 'Fan', status: true, icon: '🌪️' }
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [chartData, setChartData] = useState<any>(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [uptime, setUptime] = useState('00:00:00');
  const startTimeRef = useRef(Date.now());

  // Update clock & uptime
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      const elapsed = Date.now() - startTimeRef.current;
      const sec = Math.floor((elapsed / 1000) % 60);
      const min = Math.floor((elapsed / (1000 * 60)) % 60);
      const hr = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
      setUptime(`${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize & update chart
  useEffect(() => {
    const labels = Array.from({ length: 12 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    const tempData = sensors[0];
    const humidData = sensors[1];

    setChartData({
      labels,
      datasets: [
        {
          label: `${tempData.name} (${tempData.unit})`,
          data: Array.from({ length: 12 }, () => 20 + Math.random() * 10),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: `${humidData.name} (${humidData.unit})`,
          data: Array.from({ length: 12 }, () => 50 + Math.random() * 30),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    });
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      normal: '#10b981',
      warning: '#f59e0b',
      critical: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const toggleRelay = (id: string) => {
    setRelays(prev =>
      prev.map(relay =>
        relay.id === id ? { ...relay, status: !relay.status } : relay
      )
    );
    addLog('control', relays.find(r => r.id === id)?.name || 'Device', 'Toggled');
  };

  const addLog = (type: LogEntry['type'], details: string, value: string) => {
    const newLog: LogEntry = {
      time: new Date().toLocaleTimeString(),
      type,
      details,
      value
    };
    setLogs(prev => [newLog, ...prev.slice(0, 9)]);
  };

  const exportData = () => {
    const csv = ['Timestamp,Temperature,Humidity,pH,EC'].join(',') + '\n' +
      Array.from({ length: 5 }, () =>
        `${new Date().toLocaleString()},${sensors[0].value},${sensors[1].value},${sensors[2].value},${sensors[3].value}`
      ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bloomeye_data.csv';
    a.click();
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h2 style={styles.title}>🌱 Monitoring Dashboard</h2>
          <p style={styles.subtitle}>Real-time Hydroponics Data Stream</p>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.timeCard}>
            <span style={styles.timeLabel}>Last Update</span>
            <span style={styles.timeValue}>{time}</span>
          </div>
          <button style={styles.btnExport} onClick={exportData}>📥 Export CSV</button>
          <div style={styles.profileIcon}>👤</div>
        </div>
      </header>

      {/* Tabs */}
      <div style={styles.tabs}>
        {['overview', 'sensors', 'controls', 'analytics'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              borderBottomColor: activeTab === tab ? '#3b82f6' : 'transparent',
              color: activeTab === tab ? '#3b82f6' : '#9ca3af'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      {activeTab === 'overview' && (
        <div style={styles.content}>
          {/* KPI Cards */}
          <div style={styles.grid}>
            {sensors.map(sensor => (
              <div key={sensor.id} style={styles.kpiCard}>
                <div style={styles.kpiHeader}>
                  <span style={styles.kpiIcon}>{sensor.icon}</span>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: getStatusColor(sensor.status),
                    boxShadow: `0 0 8px ${getStatusColor(sensor.status)}`
                  }}></div>
                </div>
                <h3 style={styles.kpiTitle}>{sensor.name}</h3>
                <div style={styles.kpiValue}>
                  {sensor.value}
                  <span style={styles.kpiUnit}>{sensor.unit}</span>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  color: getStatusColor(sensor.status)
                }}>
                  {sensor.status.toUpperCase()} • Range: {sensor.threshold.min}-{sensor.threshold.max}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3>📊 Environmental Trends</h3>
              <select style={styles.chartSelect}>
                <option>Last Hour</option>
                <option>24 Hours</option>
                <option>7 Days</option>
              </select>
            </div>
            {chartData && (
              <div style={{ height: 350 }}>
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                      legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } } },
                      tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleColor: '#f1f5f9' }
                    },
                    scales: {
                      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
                      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#f59e0b' } },
                      y1: { position: 'right' as const, grid: { drawOnChartArea: false }, ticks: { color: '#3b82f6' } }
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Controls & Logs */}
          <div style={styles.bottomGrid}>
            {/* Controls */}
            <div style={styles.controlCard}>
              <h3>🎮 Manual Override</h3>
              <div style={styles.controlList}>
                {relays.map(relay => (
                  <div key={relay.id} style={styles.controlItem}>
                    <div>
                      <h4 style={styles.controlName}>{relay.icon} {relay.name}</h4>
                      <p style={styles.controlStatus}>
                        {relay.status ? '🟢 Active' : '⚫ Inactive'}
                      </p>
                    </div>
                    <button
                      style={{
                        ...styles.toggleBtn,
                        background: relay.status ? '#10b981' : '#d1d5db'
                      }}
                      onClick={() => toggleRelay(relay.id)}
                    >
                      {relay.status ? 'ON' : 'OFF'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Logs */}
            <div style={styles.logsCard}>
              <div style={styles.logsHeader}>
                <h3>📋 Live Event Log</h3>
                <button style={styles.btnClear} onClick={() => setLogs([])}>Clear</button>
              </div>
              <div style={styles.logsList}>
                {logs.length === 0 ? (
                  <p style={{ color: '#64748b', textAlign: 'center' }}>No events yet</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} style={styles.logRow}>
                      <span style={styles.logTime}>{log.time}</span>
                      <span style={{
                        ...styles.logBadge,
                        background: log.type === 'alert' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        color: log.type === 'alert' ? '#ef4444' : '#3b82f6'
                      }}>
                        {log.type.toUpperCase()}
                      </span>
                      <span style={styles.logDetails}>{log.details}</span>
                      <span style={styles.logValue}>{log.value}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sensors' && (
        <div style={styles.content}>
          <h3>Detailed Sensor Data</h3>
          <div style={styles.table}>
            {sensors.map(sensor => (
              <div key={sensor.id} style={styles.tableRow}>
                <span>{sensor.icon} {sensor.name}</span>
                <span>{sensor.value} {sensor.unit}</span>
                <span>{sensor.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'controls' && (
        <div style={styles.content}>
          <h3>Advanced Controls</h3>
          <p style={styles.comingSoon}>⏰ Coming Soon - Schedule automation rules</p>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div style={styles.content}>
          <h3>Analytics & Reports</h3>
          <p style={styles.comingSoon}>📊 Coming Soon - Growth trends analysis</p>
        </div>
      )}

      {/* System Status Sidebar (can be floating) */}
      <div style={styles.sysStatus}>
        <div style={styles.statusRow}>
          <span>Status:</span>
          <span style={{ color: '#10b981' }}>🟢 Online</span>
        </div>
        <div style={styles.statusRow}>
          <span>Uptime:</span>
          <span>{uptime}</span>
        </div>
        <div style={styles.statusRow}>
          <span>Version:</span>
          <span>2.4.0</span>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    minHeight: '100vh',
    color: '#f1f5f9',
    fontFamily: "'Inter', sans-serif"
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem'
  },
  title: { margin: 0, fontSize: '2rem', fontWeight: 700 },
  subtitle: { margin: '0.5rem 0 0', color: '#94a3b8', fontSize: '0.9rem' },
  headerRight: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  timeCard: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(12px)',
    padding: '1rem',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem'
  },
  timeLabel: { fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' },
  timeValue: { fontSize: '1.1rem', fontWeight: 700, fontFamily: "'JetBrains Mono'" },
  btnExport: {
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 1.2rem',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s'
  },
  profileIcon: {
    width: 40,
    height: 40,
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem'
  },
  tabs: { display: 'flex', gap: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' },
  tab: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '0.95rem',
    fontWeight: 600,
    padding: '1rem 0',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s'
  },
  content: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' },
  kpiCard: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: '1.5rem',
    transition: 'all 0.3s'
  },
  kpiHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  kpiIcon: { fontSize: '1.8rem' },
  kpiTitle: { margin: 0, fontSize: '0.95rem', color: '#94a3b8', fontWeight: 500 },
  kpiValue: { fontSize: '1.8rem', fontWeight: 700, marginTop: '0.5rem' },
  kpiUnit: { fontSize: '1rem', color: '#64748b', marginLeft: '0.2rem' },
  chartCard: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: '1.5rem'
  },
  chartHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' },
  chartSelect: {
    background: 'rgba(0,0,0,0.2)',
    color: '#f1f5f9',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '0.5rem 0.8rem',
    borderRadius: 6,
    cursor: 'pointer'
  },
  bottomGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  controlCard: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: '1.5rem'
  },
  controlList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  controlItem: {
    background: 'rgba(0,0,0,0.2)',
    padding: '1rem',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  controlName: { margin: 0, fontSize: '1rem', fontWeight: 700 },
  controlStatus: { margin: '0.3rem 0 0', fontSize: '0.85rem', color: '#94a3b8' },
  toggleBtn: {
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  logsCard: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: '1.5rem'
  },
  logsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  btnClear: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#94a3b8',
    padding: '0.4rem 0.8rem',
    borderRadius: 6,
    cursor: 'pointer'
  },
  logsList: { display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: 300, overflowY: 'auto' },
  logRow: {
    display: 'grid',
    gridTemplateColumns: '80px 80px 1fr 100px',
    gap: '0.8rem',
    padding: '0.8rem',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    fontSize: '0.85rem'
  },
  logTime: { color: '#64748b', fontFamily: "'JetBrains Mono'" },
  logBadge: { padding: '0.3rem 0.6rem', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600 },
  logDetails: { color: '#cbd5e1' },
  logValue: { color: '#3b82f6', fontFamily: "'JetBrains Mono'" },
  table: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  tableRow: {
    background: 'rgba(30, 41, 59, 0.7)',
    padding: '1rem',
    borderRadius: 10,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  comingSoon: {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#60a5fa',
    padding: '1.5rem',
    borderRadius: 10,
    borderLeft: '4px solid #3b82f6',
    margin: 0
  },
  sysStatus: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: 'rgba(30, 41, 59, 0.9)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '1rem',
    fontSize: '0.85rem'
  },
  statusRow: { display: 'flex', justifyContent: 'space-between', gap: '2rem', marginBottom: '0.5rem', color: '#94a3b8' }
};

