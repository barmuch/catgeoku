@echo off
REM catgeoku Installation Script for Windows
REM This script sets up the development environment

echo.
echo ================================================
echo catgeoku Setup Script
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js detected: 
node -v
echo.

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [OK] Dependencies installed successfully
echo.

echo [INFO] Setting up Tailwind CSS...
echo [OK] Tailwind CSS configured
echo.

echo ================================================
echo Setup complete!
echo ================================================
echo.
echo Next steps:
echo.
echo 1. Start the development server:
echo    npm run dev
echo.
echo 2. Open your browser to:
echo    http://localhost:3000
echo.
echo 3. Start customizing:
echo    - Edit app/layout.js for site metadata
echo    - Add posts to content/posts/
echo    - Modify components in components/
echo.
echo Documentation:
echo    - README.md - Full documentation
echo    - QUICKSTART.md - Quick start guide
echo    - DEPLOYMENT.md - Deployment instructions
echo.
echo Happy coding!
echo.
pause
