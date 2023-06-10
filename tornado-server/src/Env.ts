export enum EnvVars {
  SITE_URL = 'SITE_URL',
  PORT = 'PORT',
  DATABASE_URL = 'DATABASE_URL',
  ADMIN_USER_EMAIL = 'ADMIN_USER_EMAIL',
  ADMIN_USER_PASS = 'ADMIN_USER_PASSWORD'
}

export const EnvDefaults = {
  [EnvVars.PORT]: 8080
};

export const ENV = Object.keys(EnvVars).reduce((prev, cur) => {
  const val = process.env[cur] ?? EnvDefaults[cur];
  if (val == null) {
    throw new Error(`Missing ENV [${cur}]`);
  }
  prev[cur] = val;
  return prev;
}, {}) as {
  [key in keyof typeof EnvVars]: string;
};
