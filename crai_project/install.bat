@echo off
REM Script de Instalacao Completa - CRAI

setlocal enabledelayedexpansion

echo.
echo ============================================================
echo   CRAI - Retention OS - Instalacao Completa
echo ============================================================
echo.

if not exist "frontend" (
    echo ERRO: Nao encontrei a pasta 'frontend'
    echo Certifique-se de estar na pasta do projeto
    pause
    exit /b 1
)

echo [1/3] Instalando FRONTEND...
cd frontend
npm install
cd ..

echo.
echo [2/3] Instalando BACKEND...
cd backend
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..

echo.
echo [3/3] Criando .env...
cd backend
if not exist ".env" (
    copy .env.example .env
)
cd ..

echo.
echo ============================================================
echo   INSTALACAO CONCLUIDA COM SUCESSO!
echo ============================================================
echo.
echo PROXIMOS PASSOS:
echo.
echo 1. BACKEND (Abra novo CMD):
echo    cd backend
echo    venv\Scripts\activate
echo    python main.py
echo.
echo 2. FRONTEND (Abra novo CMD):
echo    cd frontend
echo    npm run dev
echo.
pause