module.exports = {
  rootDir: 'src',
  coverageReporters: ['text', 'cobertura', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'animations/**/*.{ts,tsx}',
    'utils/*.{ts,tsx}',
    '!**/*.stories.*',
    '!**/__snapshots__/**',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-canvas-mock'],
  snapshotSerializers: ['@emotion/jest/serializer'],
}
