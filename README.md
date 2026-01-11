# SIMON Strapi Plugin

Strapi plugin for integrating with the SIMON monitoring system.

## Installation

### Via npm/yarn

```bash
npm install strapi-plugin-simon
# or
yarn add strapi-plugin-simon
```

### Manual Installation

1. Copy the plugin to: `src/plugins/simon`
2. Rebuild Strapi:
   ```bash
   npm run build
   # or
   yarn build
   ```
3. Restart Strapi server

## Configuration

### Step 1: Configure Settings

1. Go to **Settings → Plugins → SIMON Integration**
2. Configure:
   - **API URL**: Base URL of your SIMON API (e.g., `http://localhost:3000`)
   - **Auth Key**: Your SIMON authentication key
   - **Client ID**: Your SIMON client ID
   - **Site ID**: Your SIMON site ID
   - **Enable Cron**: Enable automatic submission
   - **Cron Interval**: Time between submissions (seconds, default: 3600)
3. Click **Save**

## API Endpoints

### Submit Data Manually

```bash
POST /simon/submit
```

### Get Settings

```bash
GET /simon/settings
```

### Update Settings

```bash
PUT /simon/settings
Content-Type: application/json

{
  "apiUrl": "http://localhost:3000",
  "authKey": "your-auth-key",
  "clientId": 1,
  "siteId": 1,
  "enableCron": true,
  "cronInterval": 3600
}
```

## Scheduled Tasks

If enabled, you can set up a cron job or use Strapi's cron feature:

```javascript
// config/cron-tasks.js
module.exports = {
  '*/60 * * * *': async ({ strapi }) => {
    await strapi.plugin('simon').controller('submit').submit();
  },
};
```

## What Data is Collected

- **Core**: Strapi version
- **Environment**: Node.js version, database info, platform
- **Plugins**: All installed plugins with versions

## Requirements

- Strapi 4.0 or higher
- Node.js 14.0 or higher
- Axios (included)

## Troubleshooting

- Check Strapi logs: console output or log files
- Verify API URL is accessible
- Ensure Client ID and Site ID are configured
- Test with API endpoint: `POST /simon/submit`
