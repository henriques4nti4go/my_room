module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
          },
        },
      ],
    ],
  };
};
