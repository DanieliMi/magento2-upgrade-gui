module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                mac: {
                    hardenedRuntime: true,
                    entitlements: "./build/entitlements.mac.inherit.plist"
                },
                linux: {
                  target: ["AppImage"]
                },
                publish: ['github'],
                appId: 'magento-upgrade-gui',
                afterSign: './afterSignHook.js'
            }
        }
    }
}