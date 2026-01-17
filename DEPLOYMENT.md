# Deployment Guide

This guide covers multiple deployment options for the Smart Attendance System.

## Option 1: Netlify Deployment

### Prerequisites
- Netlify account (free tier available)
- Netlify CLI installed: `npm install -g netlify-cli`

### Steps

1. Build the project:
   ```bash
   npm run build
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. Configure environment variables in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add your environment variables from `.env.template`

### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Option 2: Vercel Deployment

### Prerequisites
- Vercel account (free tier available)
- Vercel CLI installed: `npm install -g vercel`

### Steps

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Configure environment variables in Vercel dashboard

### Vercel Configuration File

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Option 3: GitHub Pages

### Steps

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/SmartAttendance/', // Your repo name
     // ... rest of config
   })
   ```

3. Add scripts to `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Option 4: Traditional Web Server (Apache/Nginx)

### Apache Configuration

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy `dist/` contents to web server directory:
   ```bash
   sudo cp -r dist/* /var/www/html/
   ```

3. Create `.htaccess` file in web root:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Nginx Configuration

1. Build and copy files as above

2. Update Nginx config (`/etc/nginx/sites-available/default`):
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     root /var/www/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     location /models {
       expires 1y;
       add_header Cache-Control "public, immutable";
     }
   }
   ```

3. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

## Option 5: Docker Deployment

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf for Docker

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

### Build and Run

```bash
docker build -t smart-attendance .
docker run -p 8080:80 smart-attendance
```

## Environment Variables in Production

### Important: Security

Never commit `.env` file to version control!

For production:
1. Use platform-specific environment variable settings
2. Never expose sensitive data in client-side code
3. Consider implementing a backend API for authentication

### Setting Variables on Different Platforms

**Netlify**: Site Settings > Environment Variables
**Vercel**: Project Settings > Environment Variables
**Docker**: Use `-e` flag or docker-compose.yml
**Traditional Server**: Set in web server config or systemd service

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test login functionality
- [ ] Check webcam permissions on HTTPS
- [ ] Verify face recognition models load
- [ ] Test attendance marking
- [ ] Verify CSV export works
- [ ] Check responsive design on mobile
- [ ] Update admin credentials from defaults
- [ ] Set up SSL certificate (required for webcam access)
- [ ] Configure backup strategy for localStorage data

## Important Notes

1. **HTTPS Required**: Modern browsers require HTTPS for webcam access
2. **Model Files**: Ensure face recognition models are included in deployment
3. **Storage**: Current implementation uses localStorage - consider migrating to a database for production
4. **Authentication**: Implement proper server-side authentication for production use

## Troubleshooting Deployment Issues

### Models not loading
- Check if `public/models/` files are included in build
- Verify correct paths in face recognition utility
- Check browser console for 404 errors

### Webcam not working
- Ensure site is served over HTTPS
- Check browser permissions
- Verify camera access on hosting platform

### Routing issues (404 on refresh)
- Ensure SPA redirect rules are configured
- Check web server configuration
- Verify Vite base path setting

## Support

For deployment issues:
- Check platform-specific documentation
- Review browser console for errors
- Verify all build assets are included
