export enum EnvVars {
  SITE_URL = 'SITE_URL',
  PORT = 'PORT'
}

export const EnvDefaults = {
  [EnvVars.PORT]: 8080
};

export const Env = Object.keys(EnvVars).reduce((prev, cur) => {
  const val = process.env[cur] ?? EnvDefaults[cur];
  if (val == null) {
    throw new Error(`Missing ENV [${cur}]`);
  }
  prev[cur] = val;
  return prev;
}, {}) as {
  [key in keyof typeof EnvVars]: string;
};
