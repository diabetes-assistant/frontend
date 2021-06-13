import { ReportHandler } from 'web-vitals';
import { logger } from './logger';

export function reportWebVitals(onPerfEntry: boolean | ReportHandler): void {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
        return null;
      })
      .catch((error) => logger.error(error));
  }
}
