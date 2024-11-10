module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/__tests__/**/*.ts',
    '!src/interfaces/**/*.ts',
    '!src/type-guards/**/*.ts'
  ]
}; 