export default {
  clearMocks: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  testEnvironment: 'jsdom',
  testRegex: 'WorkflowManager.test.tsx',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
