module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(ts|js)'],
  testMatch: ['**/__tests__/**/*test.(ts|js)'],
  testPathIgnorePatterns: ['dist', 'node_modules'],
  moduleFileExtensions: ['ts', 'js'],
}
