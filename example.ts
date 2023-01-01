import { log } from './lib';

class AutoTag {
  log() {
    log.warn('tag is found automatically', { awesome: '😎' });
  }
}

async function contextual() {
  log.debug('with inherited contextual attrs');
  log.error('useful for logging request-related information');
}

async function main() {
  log.info('server started', { port: 8080, foo: 'bar' });
  new AutoTag().log();

  await log.enterContext(async () => {
    log.setContext('requestId', 'foo-bar');
    await contextual();
  });
}

main().catch(console.error);
