'use strict';

module.exports = ({ strapi }) => ({
  async submit(ctx) {
    const dataCollector = strapi.plugin('simon').service('dataCollector');
    const apiClient = strapi.plugin('simon').service('apiClient');
    const settingsService = strapi.plugin('simon').service('settings');

    const config = await settingsService.getSettings();

    if (!config.clientId || !config.siteId) {
      return ctx.badRequest('Client ID or Site ID not configured');
    }

    const siteData = await dataCollector.collect();
    const baseUrl = strapi.config.server.url || `${ctx.request.protocol}://${ctx.request.host}`;

    const payload = {
      client_id: parseInt(config.clientId),
      site_id: parseInt(config.siteId),
      auth_key: config.authKey,
      application_type: 'strapi',
      site: {
        name: strapi.config.server.name || 'Strapi Site',
        url: baseUrl,
        application_type: 'strapi',
      },
      ...siteData,
    };

    const success = await apiClient.submit('intake', payload);

    if (success) {
      return ctx.send({ success: true, message: 'Data submitted successfully' });
    }

    return ctx.internalServerError('Failed to submit data');
  },
});
