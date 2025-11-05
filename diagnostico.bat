@echo off
echo ========================================
echo    Diagnostico Rapido
echo ========================================
echo.

echo 1. Verificando servidores...
netstat -ano | findstr :4000 >nul
if %ERRORLEVEL% EQU 0 (
    echo    [OK] Backend rodando na porta 4000
) else (
    echo    [ERRO] Backend NAO esta rodando!
)

netstat -ano | findstr :5173 >nul
if %ERRORLEVEL% EQU 0 (
    echo    [OK] Frontend rodando na porta 5173
) else (
    echo    [ERRO] Frontend NAO esta rodando!
)

echo.
echo 2. Verificando arquivos de configuracao...
if exist "backend\.env" (
    echo    [OK] backend\.env existe
) else (
    echo    [ERRO] backend\.env NAO encontrado!
    echo    Execute: config-mongodb.bat
)

if exist "frontend\.env" (
    echo    [OK] frontend\.env existe
) else (
    echo    [AVISO] frontend\.env nao encontrado (sera criado automaticamente)
)

echo.
echo 3. Verificando dependencias...
if exist "backend\node_modules" (
    echo    [OK] Dependencias do backend instaladas
) else (
    echo    [ERRO] Execute: cd backend ^&^& npm install
)

if exist "frontend\node_modules" (
    echo    [OK] Dependencias do frontend instaladas
) else (
    echo    [ERRO] Execute: cd frontend ^&^& npm install
)

echo.
echo ========================================
echo    PROXIMOS PASSOS:
echo ========================================
echo.
echo 1. Abra o navegador em: http://localhost:5173
echo 2. Pressione F12 para abrir o Console
echo 3. Veja se ha erros em vermelho
echo 4. Me diga o que aparece no console
echo.
pause

