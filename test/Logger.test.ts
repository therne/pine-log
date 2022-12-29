import { createPinoLogger, Logger } from '../src';

describe('Default Logger', () => {
  it('should log pretty with LOG_PRETTY env turned on', () => {
    // @ts-ignore
    process.env['LOG_PRETTY'] = 1;
    const logger = new Logger(createPinoLogger());

    logger.info('Hello', { myBoy: true });
  });
});
