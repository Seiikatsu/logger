import {pino} from 'pino';
import {LoggerConfig} from './config.js';
import {Logger} from './logger.js';

const DEFAULT_SEND_INTERVAL = 5000;
const DEFAULT_ENVIRONMENT = process.env.NODE_ENV ?? 'development';
const DEFAULT_SERVICE_VERSION = process.env.npm_package_version ?? 'unknown';

export class LoggerImpl implements Logger {
  private readonly logger: pino.Logger;

  constructor(config: LoggerConfig) {
    const transport = pino.transport({
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname'
          },
        },
        {
          target: 'pino-loki',
          options: {
            batching: true,
            interval: (config.loki.sendInternalMs ?? DEFAULT_SEND_INTERVAL) / 1000,

            labels: {
              ...(config.loki.labels ?? {}),
              service: config.serviceName,
              environment: config.environment ?? DEFAULT_ENVIRONMENT,
              version: config.serviceVersion ?? DEFAULT_SERVICE_VERSION,
            },

            host: config.loki.host,
            basicAuth: config.loki.auth,
          },
        }
      ],
    });

    this.logger = pino(transport);
  }

  info(msg: string, ...args: any[]): void;
  info<T extends object>(obj: T, msg?: string, ...args: any[]): void {
    this.logger.info(obj, msg, ...args);
  }

  warn(msg: string, ...args: any[]): void;
  warn<T extends object>(obj: T, msg?: string, ...args: any[]): void {
    this.logger.info(obj, msg, ...args);
  }

  error(msg: string, ...args: any[]): void;
  error<T extends object>(obj: T, msg?: string, ...args: any[]): void {
    this.logger.info(obj, msg, ...args);
  }

  debug(msg: string, ...args: any[]): void;
  debug<T extends object>(obj: T, msg?: string, ...args: any[]): void {
    this.logger.info(obj, msg, ...args);
  }
}
