@echo off
echo ========================================
echo   PASAPALABRA - POLITICA ARGENTINA
echo ========================================
echo.
echo Iniciando servidor...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado.
    echo Por favor instala Node.js desde: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Verificar si las dependencias están instaladas
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    echo.
)

REM Iniciar el servidor
echo Servidor iniciando en http://localhost:3000
echo Presiona Ctrl+C para detener el servidor
echo.
npm start