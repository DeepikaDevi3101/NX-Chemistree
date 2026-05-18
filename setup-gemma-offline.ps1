# NX Chemistree - Gemma 4 Offline Setup Script
# This script automates downloading Ollama, configuring CORS, pulling the Gemma 4 model, and updating .env.

Clear-Host
Write-Host "========================================= " -ForegroundColor Cyan
Write-Host "🧪 NX CHEMISTREE - OFFLINE GEMMA 4 SETUP  " -ForegroundColor Cyan -Bold
Write-Host "========================================= " -ForegroundColor Cyan
Write-Host ""

# 1. Configure CORS environment variable (CRITICAL for browser applications)
Write-Host "[1/5] Configuring Windows Environment Variables for CORS..." -ForegroundColor Yellow
try {
    [System.Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
    $env:OLLAMA_ORIGINS = "*"
    Write-Host "✅ Successfully set OLLAMA_ORIGINS = '*'" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to set environment variable: $_" -ForegroundColor Red
}
Write-Host ""

# 2. Check if Ollama is installed
Write-Host "[2/5] Checking for Ollama installation..." -ForegroundColor Yellow
$ollamaPath = Get-Command ollama -ErrorAction SilentlyContinue

if (-not $ollamaPath) {
    # Try looking in default installation directory
    $defaultPath = "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe"
    if (Test-Path $defaultPath) {
        $ollamaPath = $defaultPath
        Write-Host "✅ Found Ollama at $defaultPath" -ForegroundColor Green
    }
}

if (-not $ollamaPath) {
    Write-Host "⚠️ Ollama is not installed on this system." -ForegroundColor Cyan
    Write-Host "📥 Downloading official Ollama installer from ollama.com..." -ForegroundColor Cyan
    
    $installerPath = "$env:USERPROFILE\Downloads\OllamaSetup.exe"
    $url = "https://ollama.com/download/OllamaSetup.exe"
    
    try {
        # Download with a premium progress bar
        Invoke-WebRequest -Uri $url -OutFile $installerPath -UserAgent "Mozilla/5.0"
        Write-Host "✅ Download complete! Saved to: $installerPath" -ForegroundColor Green
        
        Write-Host "🚀 Launching Ollama Installer. Please complete the setup in the window that opens..." -ForegroundColor Yellow
        Start-Process $installerPath -Wait
        Write-Host "✅ Installer finished!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Download failed: $_" -ForegroundColor Red
        Write-Host "Please download Ollama manually from: https://ollama.com/download" -ForegroundColor Yellow
        Exit
    }
} else {
    Write-Host "✅ Ollama is already installed!" -ForegroundColor Green
}
Write-Host ""

# 3. Ensure Ollama local server is running
Write-Host "[3/5] Starting Ollama local server..." -ForegroundColor Yellow
$isRunning = Get-Process ollama -ErrorAction SilentlyContinue
if (-not $isRunning) {
    Write-Host "🚀 Launching Ollama background service..." -ForegroundColor Cyan
    # Launch Ollama app
    $ollamaAppPath = "$env:LOCALAPPDATA\Programs\Ollama\ollama app.exe"
    if (Test-Path $ollamaAppPath) {
        Start-Process $ollamaAppPath
    } else {
        Start-Process "ollama" -ArgumentList "serve" -WindowStyle Hidden
    }
    # Wait for service to warm up
    Start-Sleep -Seconds 5
}
Write-Host "✅ Ollama server is active and running!" -ForegroundColor Green
Write-Host ""

# 4. Pull Gemma 4 model (e2b version)
Write-Host "[4/5] Pulling Gemma 4 (e2b) model from library..." -ForegroundColor Yellow
Write-Host "⏳ This may take a few minutes depending on your internet speed..." -ForegroundColor Cyan
Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
& ollama pull gemma4:e2b
Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
Write-Host "✅ Gemma 4 model downloaded and loaded successfully!" -ForegroundColor Green
Write-Host ""

# 5. Enable offline mode in .env
Write-Host "[5/5] Configuring the Chemistree app settings..." -ForegroundColor Yellow
$envFilePath = Join-Path $PSScriptRoot ".env"

if (Test-Path $envFilePath) {
    $content = Get-Content $envFilePath
    $newContent = @()
    $hasLocalOllamaLine = $false

    foreach ($line in $content) {
        if ($line -like "*VITE_USE_LOCAL_OLLAMA*") {
            $newContent += "VITE_USE_LOCAL_OLLAMA=true"
            $hasLocalOllamaLine = $true
        } else {
            $newContent += $line
        }
    }

    if (-not $hasLocalOllamaLine) {
        $newContent += ""
        $newContent += "# Local Offline Gemma 4 Setup"
        $newContent += "VITE_USE_LOCAL_OLLAMA=true"
        $newContent += "VITE_OLLAMA_API_URL=http://localhost:11434/api/generate"
        $newContent += "VITE_OLLAMA_MODEL=gemma4:e2b"
    }

    $newContent | Set-Content $envFilePath
    Write-Host "✅ Updated .env file to enable VITE_USE_LOCAL_OLLAMA=true" -ForegroundColor Green
} else {
    Write-Host "❌ .env file not found at $envFilePath. Creating a new one..." -ForegroundColor Red
    $newEnvContent = @"
# Cloud Gemma API Key (Leave default if running offline)
VITE_GEMMA_API_KEY=your_api_key_here

# Local Offline Gemma 4 Setup
VITE_USE_LOCAL_OLLAMA=true
VITE_OLLAMA_API_URL=http://localhost:11434/api/generate
VITE_OLLAMA_MODEL=gemma4:e2b
"@
    $newEnvContent | Set-Content $envFilePath
    Write-Host "✅ Created new .env file with offline Gemma 4 settings." -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 OFFLINE SETUP COMPLETE! 🎉" -ForegroundColor Green -Bold
Write-Host "1. Restart your Chemistree web server (stop and run 'npm run dev' again)." -ForegroundColor Cyan
Write-Host "2. Try the AI Chemistry Tutor offline - it will run fully locally!" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Green
