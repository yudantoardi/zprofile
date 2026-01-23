# Company Profile - Deployment Guide
## Deploy to cPanel

### Prerequisites
- cPanel hosting with Node.js support
- MySQL database
- SSH access to server

### Step 1: Upload Files
Upload all files from this project to your cPanel public_html or subdomain directory.

### Step 2: Setup Node.js Application
1. Go to cPanel > Software > Setup Node.js App
2. Create new application:
   - Node.js version: 18+ (recommended)
   - Application root: /home/username/public_html (or your subdomain path)
   - Application URL: yourdomain.com
   - Application startup file: server.js

### Step 3: Environment Variables
Create .env file in your application root with:
```
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
```

### Step 4: Database Setup
1. Create MySQL database in cPanel
2. Import the schema from prisma/schema.prisma
3. Run database migrations if needed

### Step 5: Install Dependencies & Build
The build process will be handled by cPanel Node.js manager.

### Step 6: Configure Apache
Make sure .htaccess is configured for Node.js proxy.

---

## Alternative: Manual Setup

If cPanel Node.js app doesn't work, you can use PM2:

1. SSH to server
2. Install PM2: `npm install -g pm2`
3. Build app: `npm run build`
4. Start with PM2: `pm2 start npm --name "company-profile" -- start`
5. Setup reverse proxy in Apache/.htaccess

---

## Troubleshooting

### Common Issues:
1. **Memory limit**: Increase PHP memory limit or use better hosting plan
2. **Database connection**: Check DATABASE_URL format
3. **Build failures**: Ensure all dependencies are installed
4. **Static files**: Make sure .next/static is accessible

### Logs:
Check cPanel error logs or PM2 logs for debugging.