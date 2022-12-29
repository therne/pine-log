import chalk from 'chalk';
import { inspect } from 'node:util';
import pino from 'pino';
import build from 'pino-abstract-transport';

const COLOR_BY_LEVEL = {
  trace: chalk.gray('TRACE'),
  debug: 'DEBUG',
  info: 'INFO ',
  warn: chalk.yellow('WARN '),
  error: chalk.red('ERROR'),
  fatal: chalk.red('FATAL'),
};

const SPECIAL_FIELDS = ['level', 'at', 'tag', 'msg', 'error', 'context'];

export default async function () {
  return build(async function (source) {
    for await (let obj of source) {
      const { at, tag, msg, level, error, context } = obj;
      const date = chalk.gray(at.replace('T', ' '));
      const colorLevel = COLOR_BY_LEVEL[pino.levels.labels[level]] || level;
      const attrs = Object.entries(obj)
        .filter(([k]) => !SPECIAL_FIELDS.includes(k))
        .map(([k, v]) => `${k}=${inspect(v, { colors: true, depth: 3 })}`)
        .join(' ');

      const ctx = Object.entries(context || {})
        .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
        .join(' ');
      const ctxText = ctx.length > 0 ? chalk.gray(` [${ctx}]`) : '';

      // eslint-disable-next-line no-console
      console.log(`${date} ${colorLevel} │ ${tag}: ${msg} ${attrs}${ctxText}${error ? `\n${error}` : ''}`);
    }
  });
}
