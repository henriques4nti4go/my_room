module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv",{
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }],
      [
        'module-resolver',
        {
          alias: {
            _assets: './assets',
            _components: './src/components',
            _modules: './src/modules',
            _lib: './src/lib',
            _styles: './src/styles',
            _utils: './src/utils',
            _screens: './src/screens',
            _firebase: './src/config/firebase',
            _navigations: './src/navigations',
            _config: './src/config',
            _controllers:'./src/app/controllers',
            _classes:'./src/app/classes',
            _utils:'./src/src/utils',
          },
        },
      ],
    ],
  };
};
