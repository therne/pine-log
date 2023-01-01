import pino, { P } from 'pino';

export function createPinoLogger(overrideOptions: P.LoggerOptions = {}): P.Logger {
  const isPrettyLog = process.env['LOG_PRETTY'] || process.stdout.isTTY;
  return pino(
    {
      base: null,
      level: process.env['LOG_LEVEL'] || 'trace',
      defaultLevel: 'info',
      timestamp: () => `,"at":"${new Date().toISOString()}"`,
      ...overrideOptions,
    },
    isPrettyLog ? pino.transport({ target: __dirname + '/pretty-log.mjs' }) : null,
  );
}
