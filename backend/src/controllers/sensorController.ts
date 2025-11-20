import { Request, Response } from 'express';

const sensorController = {
  getLatestReadings: (req: Request, res: Response) => {
    res.json({ readings: [] });
  }
};

export default sensorController;