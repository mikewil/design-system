const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const optimizeLocales = require('@react-aria/optimize-locales-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: './src/index.ts', // Entry point of the library
    output: {
      filename: 'index.js', // Output file name
      path: path.resolve(__dirname, 'lib'), // Output directory
      library: {
        name: '@designsystem/design-system-react',
        type: 'umd', // Output format, you can use 'umd', 'commonjs2', or 'module' for ESM
      },
      globalObject: 'this', // Ensures compatibility in both Node.js and browsers
    },
    externals: {
      // Do not bundle React and ReactDOM in the library. Mark them as peer dependencies
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDOM',
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'], // Extensions Webpack will resolve
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // Handle .ts and .tsx files
          use: {
            loader: 'ts-loader',
            options: {
              // This path is relative to the entry file not to the webpack.config.js
              configFile: '../tsconfig.json',
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.module\.css$/, // Match only .module.css files
          use: [
            'style-loader', // Inject CSS into the DOM
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'camel-case',
                  namedExport: false, // Important for preventing undefined default exports
                  localIdentName: '[path][name]__[local]--[hash:base64:5]', // Naming pattern for CSS modules
                },
                importLoaders: 1, // Ensure that CSS modules also apply to imported files
              },
            },
          ],
        },
        {
          // Handle regular CSS files (non-CSS-modules)
          test: /\.css$/,
          exclude: /\.module\.css$/, // Exclude CSS modules files
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      optimizeLocales.webpack({
        locales: ['en-US', 'fr-FR'],
      }),
      new CleanWebpackPlugin(), // Cleans the output directory before each build
    ],
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : {},
    devtool: isProduction ? 'source-map' : 'eval-source-map', // Source map settings
  }
}
