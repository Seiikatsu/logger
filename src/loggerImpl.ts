import {pino} from 'pino';
import {LoggerConfig} from './config.js';
import {LogContext, Logger} from './logger.js';

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

  info(msg: string): void;
  info<T extends LogContext>(context: T, msg?: string): void {
    this.logger.info(context, msg);
  }

  warn(msg: string): void;
  warn<T extends LogContext>(context: T, msg?: string): void {
    this.logger.warn(context, msg);
  }

  error(msg: string): void;
  error<T extends LogContext>(context: T, msg?: string): void {
    this.logger.error(context, msg);
  }

  debug(msg: string): void;
  debug<T extends LogContext>(context: T, msg?: string): void {
    this.logger.debug(context, msg);
  }
}
