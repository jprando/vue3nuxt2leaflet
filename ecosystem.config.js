module.exports = {
  apps : [{
    script: '.output/server/index.mjs',
    instances : "max",
    exec_mode: 'cluster'
  }],
};
