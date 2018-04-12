const { resolve } = require("path");
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const args = process.argv.slice(2);
const mode =
    args[args.indexOf("--mode") + 1] === "production"
        ? "production"
        : "development";
const production = mode === "production";
console.log("mode: %s, is Production:%s", mode, production);
const plugins = [
    new HtmlWebpackPlugin({
        template: resolve(__dirname, "src/index.html")
    }),
]
!production && plugins.push(
    new webpack.HotModuleReplacementPlugin()
)
module.exports = {
    entry: {
        index: resolve(__dirname, 'src/index.tsx')
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins,
    devServer: {
        contentBase: './build'
    }
};