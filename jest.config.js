module.exports = {

  coverageDirectory: '<rootDir>/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/resources/js/components/**/*.{js,jsx}'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/package.json',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
       '<rootDir>/resources/js/__tests__/__mocks__/fileMock.js'
  },
  setupTestFrameworkScriptFile:
   '<rootDir>/resources/js/__tests__/setupTests.js',

  verbose: true,
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/package.json',
    '<rootDir>/package-lock.json',
    '<rootDir>/resources/js/__tests__/__mocks__',
    '<rootDir>/resources/js/__tests__/setupTests.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};
