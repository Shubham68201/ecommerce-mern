export default {
  testEnvironment: "node",

  transform: {},

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  coveragePathIgnorePatterns: ["/node_modules/"],

  testMatch: ["**/tests/**/*.test.js"],

  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",
    "!src/config/*.js",
  ],

  setupFilesAfterEnv: ["backend/tests/setup.js"],
};
