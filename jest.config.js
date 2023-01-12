module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["template.test.ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
