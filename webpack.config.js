var path = require('path')

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    devServer: {
        host: 'tenant2.my-domain.com',
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api/': {
                target: 'http://tenant2.my-domain.com:8000'
            }  
        },

        allowedHosts: [
            'my-domain.com', 
            'tenant.my-domain.com', 
            'tenant2.my-domain.com'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader'],
            }
        ]
    }
}