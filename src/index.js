'use strict';

module.exports = {
  register(/* { strapi } */) {
    // Register plugin
  },

  bootstrap(/* { strapi } */) {
    // Bootstrap plugin
  },

  config: {
    default: {
      apiUrl: '',
      authKey: '',
      clientId: null,
      siteId: null,
      enableCron: false,
      cronInterval: 3600,
    },
    validator: (config) => {
      if (config.enableCron && (!config.apiUrl || !config.authKey || !config.clientId || !config.siteId)) {
        throw new Error('API URL, Auth Key, Client ID, and Site ID are required when cron is enabled');
      }
    },
  },

  routes: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/settings',
        handler: 'settingsController.find',
        config: {
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/settings',
        handler: 'settingsController.update',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/submit',
        handler: 'submitController.submit',
        config: {
          policies: [],
        },
      },
    ],
  },

  controllers: {
    settingsController: require('./controllers/settings'),
    submitController: require('./controllers/submit'),
  },

  services: {
    dataCollector: require('./services/data-collector'),
    apiClient: require('./services/api-client'),
  },
};
