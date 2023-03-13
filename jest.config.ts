export default {
  clearMocks: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
