const webpackConfig =  require('../node_modules/@ionic/app-scripts/config/webpack.config.js');
const webpack = require('webpack');
const env = (process.env.IONIC_ENVIRONMENT) ? process.env.IONIC_ENVIRONMENT.toLowerCase() : "dev";
const envConfigFile = require(`./environment/environment.${env}.json`);

function addPlugin(plugin) {
  webpackConfig.dev.plugins.push(plugin);
  webpackConfig.prod.plugins.push(plugin);
}

// IONIC_ENVIRONMENT=dev ionic serve

addPlugin(
  new webpack.DefinePlugin({
    webpackGlobalVars: {
      environment: JSON.stringify(envConfigFile)
    }
}));
