'use strict';

module.exports = ({ strapi }) => ({
  async collect() {
    const data = {};

    // Core version
    data.core = {
      version: strapi.config.info.strapi,
      status: 'up-to-date', // Would check for updates
    };

    // Log summary (Strapi doesn't have built-in log query)
    data.log_summary = {
      total: 0,
      error: 0,
      warning: 0,
      by_level: [],
    };

    // Environment
    data.environment = {
      node_version: process.version,
      npm_version: process.env.npm_version || 'unknown',
      web_server: 'node',
      database_type: strapi.db.config.connection.client,
      database_version: await this.getDatabaseVersion(strapi),
      platform: process.platform,
    };

    // Plugins
    data.extensions = this.getPlugins(strapi);

    // Themes (not applicable to Strapi)
    data.themes = [];

    return data;
  },

  async getDatabaseVersion(strapi) {
    try {
      const version = await strapi.db.connection.raw('SELECT VERSION() as version');
      return version[0][0].version;
    } catch (error) {
      return 'unknown';
    }
  },

  getPlugins(strapi) {
    const plugins = strapi.plugins;
    const result = [];

    for (const [key, plugin] of Object.entries(plugins)) {
      result.push({
        type: 'plugin',
        machine_name: key,
        human_name: plugin.package?.strapi?.name || key,
        version: plugin.package?.version || '0.0.0',
        status: 'enabled',
        is_custom: key.startsWith('simon') ? false : true,
      });
    }

    return result;
  },
});
