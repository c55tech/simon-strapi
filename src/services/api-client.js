'use strict';

const axios = require('axios');

module.exports = ({ strapi }) => ({
  async submit(endpoint, data) {
    const config = await strapi.plugin('simon').service('settings').getSettings();

    if (!config.apiUrl || !config.authKey) {
      strapi.log.error('SIMON: API URL or Auth Key not configured');
      return false;
    }

    const url = `${config.apiUrl.replace(/\/$/, '')}/api/${endpoint.replace(/^\//, '')}`;

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Key': config.authKey,
        },
        timeout: 30000,
      });

      return response.status >= 200 && response.status < 300;
    } catch (error) {
      strapi.log.error('SIMON API Error:', error.message);
      return false;
    }
  },
});
