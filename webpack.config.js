const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const IconFontPlugin = require('icon-font-loader').Plugin

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', },
                    { loader: "icon-font-loader" }]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader"
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options:{
                    esModule:false,
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options:{
                    esModule:false,
                }
            },
            {
                test: /\.(woff2?|woff|eot|svg|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/example.html'
        }),
        // new IconFontPlugin()
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: false,
        port: 5507,
        open: true
    },
    devtool: 'source-map'
};