const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

module.exports = {
  script: {
    build: {
      script: "node_modules\\.bin\\parcel build src\\index.html --out-dir dist --no-cache --no-source-maps",
      overrideCracoConfig: true
    }
  },
  style: {
    postcss: {
      plugins: [
        postcssFlexbugsFixes,
        postcssPresetEnv({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    },
  },
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@routes': path.resolve(__dirname, './src/routes'),
    },
  },
  devServer: {
    historyApiFallback: true,
  },
};
