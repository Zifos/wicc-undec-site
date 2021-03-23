declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    ENV: string;
    URL: string;
    MONGO_PASS: string;
    NEXT_AUTH_SECRET: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    AUTH0_DOMAIN: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET_URL: string;
  }
}
