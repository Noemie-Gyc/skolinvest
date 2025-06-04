import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', 
});

const customJestConfig = {
  preset: 'ts-jest',            
  testEnvironment: 'jsdom',    
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], 
};

export default createJestConfig(customJestConfig);
