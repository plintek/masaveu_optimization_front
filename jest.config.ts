import type { Config } from "@jest/types";
import * as pathsConfig from "./config/paths.json";

const moduleNameMapper: { [key: string]: string } = {};

pathsConfig.paths.forEach((pathConfig: { alias: string; path: string }) => {
    moduleNameMapper[`^${pathConfig["alias"]}(.*)$`] = `<rootDir>/src/${pathConfig["path"]}$1`;
});

// Or async function
export default async (): Promise<Config.InitialOptions> => {
    return {
        verbose: true,
        testEnvironment: "jsdom",
        testMatch: ["**/src/**/*.(spec|test).js"],
        transform: {
            "\\.[jt]sx?$": "babel-jest",
            ".+\\.(png|jpg|svg|woff2)$": "jest-transform-stub",
        },
        moduleNameMapper,
    };
};
