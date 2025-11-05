@echo off
echo Instalando dependencias do backend...
cd backend
call npm install

echo.
echo Instalando dependencias do frontend...
cd ..\frontend
call npm install

echo.
echo Todas as dependencias foram instaladas!
echo.
echo Proximos passos:
echo 1. Configure o arquivo backend\.env com suas credenciais MongoDB
echo 2. Configure o arquivo frontend\.env com a URL da API
echo 3. Execute 'npm start' na pasta backend para iniciar o servidor
echo 4. Execute 'npm run dev' na pasta frontend para iniciar o frontend
pause

