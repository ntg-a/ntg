export type Env = {
    TWT_API_KEY: string;
    TWT_API_SECRET: string;
    TWT_ACCESS_TOKEN: string;
    TWT_ACCESS_SECRET: string;
    TWT_BEARER_TOKEN: string;
    TWT_USER_ID: string;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}
