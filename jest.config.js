module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },
  testRegex: '\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
