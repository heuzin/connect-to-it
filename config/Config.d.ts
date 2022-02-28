/* tslint:disable */
/* eslint-disable */
declare module 'node-config-ts' {
    interface IConfig {
        mongoURI: string;
        jwtSecret: string;
        githubClientId: string;
        githubSecret: string;
    }
    export const config: Config;
    export type Config = IConfig;
}
