//vue.config.js
module.exports = {
    runtimeCompiler: true,
    devServer: {
        open: true,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8443',
                changeOrigin: true,
                pathRewrite: {
                    '^/api':'/api'
                }
            }
        }
    }
}