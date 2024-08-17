export type LogContext = Error | Record<string, any> | {
  [key: string]: any;
  err: Error;
}

interface LogFn {
  <T extends LogContext>(context: T, msg?: string): void;

  (msg: string): void;
}

export interface Logger {
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  debug: LogFn;
}
