import { createPinoLogger } from './createPinoLogger';
import { Logger } from './Logger';

export * from './Logger';
export * from './createPinoLogger';
export * from './utils';

export const log = new Logger(createPinoLogger());
