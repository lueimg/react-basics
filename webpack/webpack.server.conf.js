module.exports = {
    entry: './source/server.js',
    output: {
        filename: 'index.js',
        path:'./build/server',
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json',

            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_module)/,
                query: {
                    presets: ['latest-minimal', 'react']
                }
            }
        ]
    },
    target: 'node'
}