<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1HeIBIRZ_kHCUP-H36swYe7G3Qj3NZ42i

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and fill in your Gemini API key and other values (do not commit `.env.local`):
   - `cp .env.example .env.local` (or create manually)
3. Run the app:
   `npm run dev`

## Deployment overview

This project uses a static frontend (Vite build output in `dist`) and an Express API server. A recommended production setup is:

- Host the frontend (static files) on cPanel (example.com).
- Host the API server on Render (api.example.com) where you can securely store server secrets (GEMINI_API_KEY / API_KEY).

Key points:
- Server-only secrets must remain on the server (Render). Never put `GEMINI_API_KEY` or `API_KEY` into frontend code.
- Configure `FRONTEND_URL` on the Render service to the frontend domain (e.g. `https://example.com`) so the server's CORS is restricted.
- When building the frontend, set `VITE_API_BASE_URL` to `https://api.example.com` so client requests go to the Render-hosted API.

### Preparing the server on Render

1. In Render dashboard, create a new Web Service and point it to this repository (or the server directory).
2. Add environment variables (Render > Environment > Add Variable):
   - `GEMINI_API_KEY` (or `API_KEY`) = <your secret>
   - `FRONTEND_URL` = https://example.com
3. Set custom domain `api.example.com` and enable TLS on Render.
4. Deploy. Verify server logs show the Gemini key is present (server prints a message on startup when it finds the key).

### Building the frontend for cPanel

1. Set the API base URL for the client when building (PowerShell example):

```powershell
$env:VITE_API_BASE_URL = 'https://api.example.com'
npm run build
```

2. The build outputs the `dist` folder. Upload the contents of `dist` to your cPanel document root (`public_html`) or to your subdomain's root.

3. Include the included `.htaccess` file in the same folder as `index.html` on the cPanel host to enable SPA routing and caching (`.htaccess` is in this repo root — upload it alongside the `dist` files).

### CORS and security

- The server reads `FRONTEND_URL` (comma-separated allowed origins) and only allows requests from those origins. Set it to your frontend domain.
- Keep secrets out of the frontend. Use `VITE_API_BASE_URL` to point the built client at the Render API.
- Ensure HTTPS is enabled on both the frontend and API.

### CI/CD (optional)

- For automatic deployments:
  - Connect your server repo to Render (auto-deploy on push).
  - Use GitHub Actions to build the frontend and upload `dist` to cPanel (via FTP) on push to `main`.

If you want, I can add a GitHub Actions workflow that builds the frontend and deploys to cPanel via FTP, and/or prepare a Render service configuration.
