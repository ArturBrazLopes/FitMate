@echo off
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
call config-mongodb.bat
if not exist "frontend\.env" echo VITE_API_URL=http://localhost:4000 > frontend\.env
echo Instalacao concluida!
