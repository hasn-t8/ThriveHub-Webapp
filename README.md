
## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

# Deployment
1. Update the deployment repo here: https://gitlab.techchaps.net/development/clientelle/thrive-hub/web_app_v2
2. ssh inot DO and `git pull origin main`   
3. `docker-compose build --no-cache && docker-compose up -d`
4. SSL is being handled by the separate caddy project  

Note: Check the .env for production environment.