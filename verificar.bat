@echo off
echo Verificando status dos servidores...
echo.
echo Backend (porta 4000):
netstat -ano | findstr :4000 >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend rodando
) else (
    echo [ERRO] Backend nao esta rodando!
)

echo.
echo Frontend (porta 5173):
netstat -ano | findstr :5173 >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Frontend rodando
) else (
    echo [ERRO] Frontend nao esta rodando!
)

echo.
echo Verificando arquivos de configuracao...
if exist "backend\.env" (
    echo [OK] backend\.env existe
) else (
    echo [ERRO] backend\.env nao encontrado! Execute config-mongodb.bat
)

if exist "frontend\.env" (
    echo [OK] frontend\.env existe
) else (
    echo [AVISO] frontend\.env nao encontrado (sera criado automaticamente)
)

echo.
pause

