const ignores = ['/node_modules/', '/src/app/', '__mocks__'];

module.exports = {
  collectCoverageFrom: ['src/**/*.+(ts|tsx|js)'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
  testPathIgnorePatterns: [...ignores],
  coveragePathIgnorePatterns: [...ignores, 'src/(umd|cjs|esm)-entry.js$'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  coverageDirectory: './coverage',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/lib/test/test-setup.js'],
  verbose: true
};
