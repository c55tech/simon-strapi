'use strict';

module.exports = ({ strapi }) => ({
  async find(ctx) {
    const settingsService = strapi.plugin('simon').service('settings');
    const settings = await settingsService.getSettings();
    ctx.body = settings;
  },

  async update(ctx) {
    const settingsService = strapi.plugin('simon').service('settings');
    const { body } = ctx.request;

    try {
      await settingsService.updateSettings(body);
      ctx.body = { success: true };
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },
});
