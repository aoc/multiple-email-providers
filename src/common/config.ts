import dotenv from 'dotenv';

export enum Env {
  DEV = 'DEV'
}

export interface EmailProviderConfig {
  id: string;
  token: string;
}

export interface Config {
  env: Env;
  serverPort: number;
  logger: {
    level: string;
  };
  emailProviders: EmailProviderConfig[];
  http: {
    req: {
      timeout: number;
    };
  };
}

dotenv.config();

const emailProviders: EmailProviderConfig[] = Object.keys(process.env)
  .filter(key => key.startsWith('EMAIL_PROVIDER') && key.endsWith('_ID'))
  .sort()
  .map(providerId => ({
    id: process.env[providerId] || '',
    token: process.env[providerId.replace('_ID', '_TOKEN')] || ''
  }));

const config: Config = {
  env: Env[process.env.ENV as keyof typeof Env],
  serverPort: (process.env.SERVER_PORT || 3000) as number,
  logger: {
    level: (process.env.LOGGER_LEVEL || 'info') as string
  },
  emailProviders,
  http: {
    req: {
      timeout: (process.env.HTTP_REQ_TIMEOUT || 5000) as number
    }
  }
};

export default config;
