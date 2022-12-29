export const prettyError = (err: unknown) =>
  err instanceof Error && err.stack
    ? err.stack?.slice(0, err.stack.lastIndexOf('\n    at Module._compile'))
    : err instanceof Error
    ? err.message
    : String(err);

export const callerName = (skipLevel = 0): string => {
  // use caller name (function name / class name) as a tag by default
  const stacktrace: { stack?: string } = {};
  Error.captureStackTrace(stacktrace);

  const caller = stacktrace.stack!.split('\n')[3 + skipLevel].trim().replace('at ', '').split(' (')[0].split(':')[0];

  if (caller.startsWith('/')) {
    // extract module name (e.g. /usr/local/projects/something/hello.module.ts -> hello.module)
    const pathFragments = caller.split('/');
    return pathFragments[pathFragments.length - 1].split('.').slice(0, -1).join('.');
  }
  // extract class name / function name
  return caller.split('.')[0];
};
