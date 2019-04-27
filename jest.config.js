module.exports = {
  testMatch: ['<rootDir>/src/**/*.test.js'],
  coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coveragePathIgnorePatterns: ['src/index.js', 'src/serviceWorker.js']
};
