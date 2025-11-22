import express from 'express';
import mqtt from './mqtt/client'; // Import MQTT client
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log('✓ MQTT client initialized');
});