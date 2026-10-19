import { Request, Response, NextFunction } from 'express';
import reportService from '../services/report.service';

export class ReportController {
  async getCsv(req: Request, res: Response, next: NextFunction) {
    try {
      const { fieldId, deviceId, startDate, endDate } = req.query;
      const csvData = await reportService.getCsvData({
        fieldId: fieldId as string | undefined,
        deviceId: deviceId as string | undefined,
        startDate: startDate as string | undefined,
        endDate: endDate as string | undefined,
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="telemetry_export_${Date.now()}.csv"`);
      return res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await reportService.getSummary();
      return res.json(summary);
    } catch (error) {
      next(error);
    }
  }
}

export const reportController = new ReportController();
export default reportController;
