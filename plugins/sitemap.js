const { getSitemapData, generateSitemap, generateRobotsTxt } = require('./util');
const WebpackPluginCompiler = require('./plugin-compiler');

module.exports = function sitemap(nextConfig = {}) {
  const { env, outputDirectory, outputName, verbose = false } = nextConfig;

  const plugin = {
    name: 'Sitemap',
    outputDirectory: outputDirectory || './public',
    outputName: outputName || 'sitemap.xml',
    getData: getSitemapData,
    generate: generateSitemap,
    postcreate: generateRobotsTxt,
  };

  const { WORDPRESS_GRAPHQL_ENDPOINT } = env;

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (config.watchOptions) {
        if (!Array.isArray(config.watchOptions.ignored)) {
          config.watchOptions.ignored = [config.watchOptions.ignored];
        }

        config.plugins.push(
          new WebpackPluginCompiler({
            url: WORDPRESS_GRAPHQL_ENDPOINT,
            plugin,
            verbose,
            nextConfig,
          })
        );
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
