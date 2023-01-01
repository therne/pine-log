import { createPinoLogger, Logger } from '../src';

const flushLogs = () => new Promise((resolve) => setTimeout(resolve, 100));

describe('Default Logger', () => {
  let log: jest.SpyInstance;
  let lines: string[] = [];

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation((text) => lines.push(text));
  });

  afterEach(() => {
    log.mockReset();
  });

  it('should log pretty with LOG_PRETTY env turned on', async () => {
    // @ts-ignore
    process.env['LOG_PRETTY'] = 1;
    const logger = new Logger(createPinoLogger());

    logger.info('Hello', { myBoy: true });
    await flushLogs();
  });

  it('should log contextually', async () => {});
});
