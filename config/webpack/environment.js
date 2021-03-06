const { environment } = require("@rails/webpacker");
const erb = require("./loaders/erb");
const webpack = require("webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

// resolve-url-loader must be used before sass-loader
environment.loaders.get("sass").use.splice(-1, 0, {
  loader: "resolve-url-loader"
});

const sassLoader = environment.loaders.get("sass");
const sassLoaderConfig = sassLoader.use.find(function(element) {
  return element.loader == "sass-loader";
});

// Use Dart-implementation of Sass (default is node-sass)
const options = sassLoaderConfig.options;
options.implementation = require("sass");

environment.config.resolve.alias = {'jquery': "jquery/dist/jquery.slim.js"};

environment.splitChunks();

environment.loaders.prepend("erb", erb);
module.exports = environment;
