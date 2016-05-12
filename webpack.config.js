module.exports = {
    entry: "./arduz-web.ts",
    output: {
        path: __dirname + "/www",
        filename: "bundle.js"
    },
    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ['', '.ts', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};