/* tslint:disable */
/* eslint-disable */
declare module 'node-config-ts' {
    interface IConfig {
        mongoURI: string;
        jwtSecret: string;
    }
    export const config: Config;
    export type Config = IConfig;
}
