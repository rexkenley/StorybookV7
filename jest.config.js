module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/index.ts"],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  snapshotSerializers: ["@fluentui/jest-serializer-merge-styles"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "/coverage/",
    "/lib/",
    "/node_modules/",
    "/pcf/",
    "/storybook-static/"
  ],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.mdx?$": "@storybook/addon-docs/jest-transform-mdx"
  },
  transformIgnorePatterns: ["node_modules/(?!(@fluentui)/)"]
};
