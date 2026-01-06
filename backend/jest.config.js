export default {
  testEnvironment: "node",

  transform: {},

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  coveragePathIgnorePatterns: ["/node_modules/"],

  testMatch: ["**/tests/**/*.test.js"],

  collectCoverageFrom: [
  // ✅ Core business logic
  'src/controllers/**/*.js',
  'src/models/**/*.js',
  'src/middlewares/**/*.js',
  'src/utils/**/*.js',

  // ❌ App bootstrap
  '!src/app.js',
  '!src/server.js',

  // ❌ Upload / file infra
  '!src/controllers/uploadController.js',
  '!src/middlewares/upload.js',

  // ❌ Routes (no logic)
  '!src/routes/**',

  // ❌ Seeders & scripts
  '!src/utils/seeder.js',
  '!src/utils/orderSeeder.js',

  // ❌ Trivial helpers
  '!src/utils/apiResponse.js',

  // ❌ 404 handler
  '!src/middlewares/notFound.js',
],


  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};
