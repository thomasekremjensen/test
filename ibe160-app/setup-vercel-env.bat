@echo off
REM Vercel Environment Variables Setup Script
REM This script automatically adds all environment variables to your Vercel project

echo ========================================
echo Vercel Environment Variables Setup
echo ========================================
echo.
echo This script will add all required environment variables to Vercel
echo Make sure you have Vercel CLI installed and are logged in!
echo.
echo If you haven't installed Vercel CLI yet, run:
echo   npm install -g vercel
echo   vercel login
echo.
pause

cd /d "%~dp0"

echo.
echo Adding environment variables to Vercel...
echo.

REM Database
echo [1/15] Adding DATABASE_URL...
vercel env add DATABASE_URL production < nul
echo postgresql://postgres.bucxoglospkxknbqynhq:ThomasHildeFrida1234!@aws-1-eu-west-1.pooler.supabase.com:5432/postgres

echo.
echo [2/15] Adding DIRECT_URL...
vercel env add DIRECT_URL production < nul
echo postgresql://postgres.bucxoglospkxknbqynhq:ThomasHildeFrida1234!@db.bucxoglospkxknbqynhq.supabase.co:5432/postgres

echo.
echo [3/15] Adding AUTH_SECRET...
vercel env add AUTH_SECRET production < nul
echo NkwzuIdgvzt+MBxI4Vl6EKcWFv8uEmfzCpJVn97u7Jo=

echo.
echo [4/15] Adding AUTH_URL...
vercel env add AUTH_URL production < nul
echo https://your-app-name.vercel.app

echo.
echo [5/15] Adding SPOONACULAR_API_KEY...
vercel env add SPOONACULAR_API_KEY production < nul
echo b0b7eb9913b94806966ecd2f1f63422f

echo.
echo [6/15] Adding NEXT_PUBLIC_SPOONACULAR_API_KEY...
vercel env add NEXT_PUBLIC_SPOONACULAR_API_KEY production < nul
echo b0b7eb9913b94806966ecd2f1f63422f

echo.
echo [7/15] Adding GOOGLE_AI_API_KEY...
vercel env add GOOGLE_AI_API_KEY production < nul
echo AIzaSyBKBh1b5qA84v8R-c3t8J1nUBa4yYdKjl0

echo.
echo [8/15] Adding NEXT_PUBLIC_GOOGLE_AI_API_KEY...
vercel env add NEXT_PUBLIC_GOOGLE_AI_API_KEY production < nul
echo AIzaSyBKBh1b5qA84v8R-c3t8J1nUBa4yYdKjl0

echo.
echo [9/15] Adding RESEND_API_KEY...
vercel env add RESEND_API_KEY production < nul
echo re_PwrH4kme_C6UPhGQbkRzRQEAxN8xVR52R

echo.
echo [10/15] Adding EMAIL_FROM...
vercel env add EMAIL_FROM production < nul
echo noreply@ibe160.com

echo.
echo [11/15] Adding SUPPORT_EMAIL...
vercel env add SUPPORT_EMAIL production < nul
echo thomas.ekrem.jensen@gmail.com

echo.
echo [12/15] Adding NEXT_PUBLIC_VAPID_PUBLIC_KEY...
vercel env add NEXT_PUBLIC_VAPID_PUBLIC_KEY production < nul
echo BJa7FOGcYFDVCPEodT8qsJHf9LSZXnwX1uvXrZvE-g0n8d1z9M7JgDZLHMLbnbsH6yLAP6UHTu5L0DfsblpZpnQ

echo.
echo [13/15] Adding VAPID_PRIVATE_KEY...
vercel env add VAPID_PRIVATE_KEY production < nul
echo y9V8fy4ot7xXfIBJ6ZFQjHpabepml62Vrt33ROPHAgA

echo.
echo [14/15] Adding VAPID_SUBJECT...
vercel env add VAPID_SUBJECT production < nul
echo mailto:thomas.ekrem.jensen@gmail.com

echo.
echo [15/15] Adding CRON_SECRET...
vercel env add CRON_SECRET production < nul
echo your-secret-cron-key-here

echo.
echo ========================================
echo Environment variables setup complete!
echo ========================================
echo.
echo Next steps:
echo 1. Go to Vercel dashboard
echo 2. Navigate to Settings -^> Environment Variables
echo 3. Verify all variables are added correctly
echo 4. Trigger a new deployment
echo.
pause
