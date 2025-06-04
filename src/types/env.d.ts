export interface EnvConfig {
  PORT: number;
  NODE_ENV: "development" | "production";
  ORIGIN: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
}
