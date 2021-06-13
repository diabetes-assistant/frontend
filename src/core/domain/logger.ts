import * as winston from 'winston';
import { format } from 'winston';

const logFormat = format.printf(
  (info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
);

export const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});
