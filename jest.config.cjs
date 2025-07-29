module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // Ignore all node_modules EXCEPT for 'query-string' (and potentially other ESM packages)
    '/node_modules/(?!(query-string|decode-uri-component|filter-obj|split-on-first)/)',
  ],

  moduleNameMapper: {
    // Mocks CSS, Less, SCSS, Sass files to prevent Jest from trying to parse them
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // You might also need this for image/svg files if they cause similar issues
    // '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.module\\.css$': 'identity-obj-proxy',
  },
  setupFiles: ['<rootDir>/__mocks__/intersectionObserverMock.js'], 
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

}; 
