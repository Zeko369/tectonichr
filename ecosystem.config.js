module.exports = {
  apps: [
    {
      name: "tectonic-main",
      script: "./scripts/start.sh",
      args: "",
      time: true,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "2G",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {},
};
