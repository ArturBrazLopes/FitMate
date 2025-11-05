@echo off
call config-mongodb.bat >nul 2>&1
if not exist "backend\node_modules" cd backend && npm install && cd ..
if not exist "frontend\node_modules" cd frontend && npm install && cd ..
if not exist "frontend\.env" echo VITE_API_URL=http://localhost:4000 > frontend\.env
start "Backend" cmd /k "cd /d %~dp0backend && npm start"
timeout /t 2 /nobreak >nul
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
echo Servidores iniciados! Acesse: http://localhost:5173
