const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const config = {
        entry: {
            app: ['babel-polyfill', './src/bigmath.js']
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                }
            ]
        }
    };

    if (options.mode === 'development') {
        //... Development 설정
        config = {
            ...config,
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new HtmlWebpackPlugin({
                    title: 'Development',
                    showErrors: true
                })
            ],
            devtool: 'inline-source-map',
            devServer: {
                hot: true,
                host: '0.0.0.0',
                contentBase: './dist',
                stats: {
                    color: true
                }
            }
        };
    } else {
        //... Production 설정
        config.plugins = [
            new CleanWebpackPlugin()
        ];
    }

    return config;
};
