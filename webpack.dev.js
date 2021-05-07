const path = require('path')
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', }
                ]
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
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: false,
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'example/example.html'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: false,
        port: 5507,
        open: true,
        hot: true
    }
}