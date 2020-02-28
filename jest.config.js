
module.exports = {
    testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
    modulePaths: ['node_modules'],
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
    setupFiles: ['<rootDir>/test/jest-globals.js'],
    preset: 'ts-jest/presets/js-with-ts',
    moduleDirectories: [
        '<rootDir>/src',
        '<rootDir>/src/toolkit/components',
    ],
    collectCoverageFrom: [
        "./src/**/*.{tsx,ts}",
        "!**/node_modules/**",
    ],
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|Icons)$': '<rootDir>/test/mocks/empty-module.ts',
        '\\.(css|less)$': '<rootDir>/test/css-modules.ts',
        "^@toolkit(.*)$": '<rootDir>/src/toolkit$1',
        "^@hooks(.*)$": '<rootDir>/src/hooks$1',
        "^@components(.*)$": '<rootDir>/src/components$1',
        '^@screens(.*)$': '<rootDir>/src/screens$1',
        '^@services/Analytics': '<rootDir>/test/app-insights.tsx',
        '^@services/FetchAdapter': '<rootDir>/test/ApiMock',
        '^lodash/debounce': '<rootDir>/test/mocks/debounce',
        '^@services(.*)$': '<rootDir>/src/services$1',
        "^@context/UserContext": '<rootDir>/test/userContextMock',
        "^@context/CpaUserContext": '<rootDir>/test/cpaContextMock',
        "^@context(.*)$": '<rootDir>/src/context$1',
        '^@assets(.*)$': '<rootDir>/assets$1',
        '^@icons(.*)$': '<rootDir>/src/icons$1',
        '^@test/test-utils': '<rootDir>/test/test-utils',
    },
    globals: {
        'ts-jest': {
            babelConfig: require('./babel.config.js')()
        }
    }
};