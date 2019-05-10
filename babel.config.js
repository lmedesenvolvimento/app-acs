const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ["./src/"],
      alias: {
        "@redux": "./src/app/store",
        "@assets": "./assets",
        "@": "./src/app",
      }
    }
  ]

];

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};
