import { AsyncLocalStorage } from 'async_hooks';
import { Level, P } from 'pino';
import { callerName, prettyError } from './utils';

export type LoggerAttr = { [k: string]: any } & {
  error?: any;
  tag?: string;
};

export class Logger {
  private contextStore = new AsyncLocalStorage<{ [k: string]: any }>();

  constructor(private pino: P.Logger) {}

  enterContext<T>(fn: () => Promise<T>): Promise<T> {
    return this.contextStore.run({}, fn);
  }

  setContext(key: string, value: any) {
    const context = this.contextStore.getStore();
    if (!context) {
      throw new Error(
        'Context not found on async callstack. To use context attribute, you must wrap your logic in Logger.enterContext() first.',
      );
    }
    context[key] = value;
  }

  private log(level: Level, msg: string, attr: LoggerAttr) {
    // use caller name (function name / class name) as a tag by default
    const tag = callerName(1);

    const context = this.contextStore.getStore();
    const logObject = Object.assign(
      { tag, ...attr },
      attr.error ? { error: prettyError(attr.error) } : {},
      context ? { context } : {},
    );
    this.pino[level](logObject, msg);
  }

  trace(msg: string, attr: LoggerAttr = {}) {
    this.log('trace', msg, attr);
  }

  debug(msg: string, attr: LoggerAttr = {}) {
    this.log('debug', msg, attr);
  }

  info(msg: string, attr: LoggerAttr = {}) {
    this.log('info', msg, attr);
  }

  warn(msg: string, attr: LoggerAttr = {}) {
    this.log('warn', msg, attr);
  }

  error(msg: string, errorOrAttr?: Error | string | object, optionalAttr: LoggerAttr = {}) {
    const realAttr =
      typeof errorOrAttr === 'string' || errorOrAttr instanceof Error
        ? { error: errorOrAttr, ...optionalAttr }
        : errorOrAttr ?? {};

    this.log('error', msg, realAttr);
  }
}
