const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const localIdentName = isProduction ? '[hash:base64:5]' : '[name]_[local]_[contenthash:base64:5]';

const babelLoader = {
    loader: 'babel-loader',
    options: { babelrc: true },
};

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, '../src/index.tsx'),
        // unsupportedBrowser: path.resolve(__dirname, '../src/UnsupportedBrowser/index.tsx'),
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                extractComments: 'all',
            }),
            new OptimizeCSSAssetsPlugin({}),
        ]
    },
    stats: {
        colors: true,
        reasons: false,
        errorDetails: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[hash].css' : '[name].css',
            chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
            ignoreOrder: false,
        })
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, '../'),
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../src'),
            "node_modules",
        ],
        extensions: ['.tsx', '.ts', '.js', '.less', '.json'],
        alias: {
            "@mixins": path.resolve(__dirname, '../src/toolkit/lessToolkit/mixins.less'),
            "@variables": path.resolve(__dirname, '../src/toolkit/lessToolkit/variables.less'),
            "@toolkit": path.resolve(__dirname, '../src/toolkit'),
            "@icons": path.resolve(__dirname, '../src/icons'),
            "@components": path.resolve(__dirname, '../src/components'),
            '@hooks': path.resolve(__dirname, '../src/hooks'),
            '@screens': path.resolve(__dirname, '../src/screens'),
            '@services': path.resolve(__dirname, '../src/services'),
            '@navigation': path.resolve(__dirname, '../src/navigation'),
            "@context": path.resolve(__dirname, '../src/context'),
            '@assets': path.resolve(__dirname, '../assets'),
            '@test': path.resolve(__dirname, '../test'),
        },
    },
    output: {
        chunkFilename: '[name].[chunkhash].js',
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    babelLoader,
                    'ts-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    babelLoader,
                ],
            },
            {
                test: /pdf\.worker(\.min)?\.js$/,
                loader: 'file-loader'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isProduction === false,
                            reloadAll: true,
                        },
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                localIdentName,
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({}),
                            ],
                        },
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    { loader: 'url-loader', options: { limit: 10000 } },
                ],

            }
        ],
    },
};
