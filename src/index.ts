import {LoggerConfig} from './config.js';
import {Logger} from './logger.js';
import {LoggerImpl} from './loggerImpl.js';

export const createLogger = (config: LoggerConfig): Logger => {
  return new LoggerImpl(config);
}
