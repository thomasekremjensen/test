# Vercel Environment Variables Setup Script (PowerShell)
# This script automatically adds all environment variables to your Vercel project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Vercel Environment Variables Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Checking Vercel CLI installation..." -ForegroundColor Yellow

# Check if Vercel CLI is installed
$vercelExists = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelExists) {
    Write-Host "ERROR: Vercel CLI is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install it first:" -ForegroundColor Yellow
    Write-Host "  npm install -g vercel" -ForegroundColor White
    Write-Host "  vercel login" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Vercel CLI found!" -ForegroundColor Green
Write-Host ""

# Environment variables to add
$envVars = @{
    "DATABASE_URL" = "postgresql://postgres.bucxoglospkxknbqynhq:ThomasHildeFrida1234!@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
    "DIRECT_URL" = "postgresql://postgres.bucxoglospkxknbqynhq:ThomasHildeFrida1234!@db.bucxoglospkxknbqynhq.supabase.co:5432/postgres"
    "AUTH_SECRET" = "NkwzuIdgvzt+MBxI4Vl6EKcWFv8uEmfzCpJVn97u7Jo="
    "AUTH_URL" = "https://your-vercel-url.vercel.app"
    "SPOONACULAR_API_KEY" = "b0b7eb9913b94806966ecd2f1f63422f"
    "NEXT_PUBLIC_SPOONACULAR_API_KEY" = "b0b7eb9913b94806966ecd2f1f63422f"
    "GOOGLE_AI_API_KEY" = "AIzaSyBKBh1b5qA84v8R-c3t8J1nUBa4yYdKjl0"
    "NEXT_PUBLIC_GOOGLE_AI_API_KEY" = "AIzaSyBKBh1b5qA84v8R-c3t8J1nUBa4yYdKjl0"
    "RESEND_API_KEY" = "re_PwrH4kme_C6UPhGQbkRzRQEAxN8xVR52R"
    "EMAIL_FROM" = "noreply@ibe160.com"
    "SUPPORT_EMAIL" = "thomas.ekrem.jensen@gmail.com"
    "NEXT_PUBLIC_VAPID_PUBLIC_KEY" = "BJa7FOGcYFDVCPEodT8qsJHf9LSZXnwX1uvXrZvE-g0n8d1z9M7JgDZLHMLbnbsH6yLAP6UHTu5L0DfsblpZpnQ"
    "VAPID_PRIVATE_KEY" = "y9V8fy4ot7xXfIBJ6ZFQjHpabepml62Vrt33ROPHAgA"
    "VAPID_SUBJECT" = "mailto:thomas.ekrem.jensen@gmail.com"
    "CRON_SECRET" = "cron-secret-key-12345"
}

Write-Host "Adding $($envVars.Count) environment variables to Vercel..." -ForegroundColor Yellow
Write-Host ""

$count = 1
foreach ($key in $envVars.Keys) {
    Write-Host "[$count/$($envVars.Count)] Adding $key..." -ForegroundColor Cyan

    # Use echo to pipe the value to vercel env add
    $value = $envVars[$key]
    $value | vercel env add $key production

    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Success" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Failed (may already exist)" -ForegroundColor Yellow
    }

    $count++
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Verify variables in Vercel dashboard" -ForegroundColor White
Write-Host "2. Update AUTH_URL with your actual Vercel URL" -ForegroundColor White
Write-Host "3. Trigger a new deployment" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"
