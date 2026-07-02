const linkAssets = require('@react-native-community/cli-link-assets');

module.exports = {
  assets: ['./src/assets/fonts'],
  commands: [linkAssets.commands.linkAssets],
};
