import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

export default (env, argv) => {
    const isProduction = argv.mode === 'production'

    return {
        entry: './src/index.ts', // Entry point of the library
        output: {
            filename: 'index.js', // Output file name
            path: path.resolve(path.dirname(''), 'lib'), // Output directory
            library: {
                name: '@designsystem/design-system-react-testing',
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
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.mdx'], // Extensions Webpack will resolve
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/, // Handle .ts and .tsx files
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
                                    namedExport: false, // Important for preventing undefined default exports
                                    localIdentName:
                                        '[path][name]__[local]--[hash:base64:5]', // Naming pattern for CSS modules
                                },
                                importLoaders: 1, // Ensure that CSS modules also apply to imported files
                            },
                        },
                    ],
                },
                {
                    test: /\.mdx$/,
                    use: [
                        {
                            loader: 'babel-loader', // Babel processes JS/TS inside MDX
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-react', // To handle JSX inside MDX
                                ],
                            },
                        },
                        {
                            loader: '@mdx-js/loader', // MDX loader to handle MDX syntax
                        },
                    ],
                },
                {
                    // Handle regular CSS files (non-CSS-modules)
                    test: /\.css$/,
                    exclude: /\.module\.css$/, // Exclude CSS modules files
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
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
