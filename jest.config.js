/** @type {import('ts-jest').JestConfigWithTsJest} */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom'
}

module.exports = createJestConfig(customJestConfig);

