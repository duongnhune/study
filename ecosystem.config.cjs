
module.exports = {
  apps: [
    {
      name: 'breezing-public-v2',
      port: process.env.PORT,
      exec_mode: 'cluster',
      instances: 'max',
      script: './server/index.mjs',
    },
  ],
};
