const { getDefaultConfig } = require('metro-config');
const path = require('path');

module.exports = (async () => {
    const {
        resolver: { sourceExts }
    } = await getDefaultConfig();
    return {
        extraNodeModules: {
            '@': path.resolve(__dirname, 'app'),
            assets: path.resolve(__dirname, 'assets')
        },
        projectRoot: path.resolve(__dirname),
        transformer: {
            babelTransformerPath: require.resolve('react-native-stylus-transformer')
        },
        resolver: {
            sourceExts: [...sourceExts, 'styl']
        }
    };
})();
