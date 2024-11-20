import { Request, Response, NextFunction } from 'express';
import { httpRequestDuration, httpRequestTotal } from '../services/monitoring';

export function monitorRequest(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, path } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode.toString();

    httpRequestDuration
      .labels(method, path, statusCode)
      .observe(duration / 1000);

    httpRequestTotal
      .labels(method, path, statusCode)
      .inc();
  });

  next();
}