@echo off
if "%1"=="" goto help
if "%1"=="help" goto help
if "%1"=="install" goto install
if "%1"=="install-frontend" goto install_frontend
if "%1"=="install-backend" goto install_backend
if "%1"=="dev" goto dev
if "%1"=="dev-frontend" goto dev_frontend
if "%1"=="dev-backend" goto dev_backend
if "%1"=="docker-up" goto docker_up
if "%1"=="docker-down" goto docker_down
if "%1"=="docker-prod" goto docker_prod
if "%1"=="docker-logs" goto docker_logs
if "%1"=="docker-clean" goto docker_clean
if "%1"=="db-migrate" goto db_migrate
if "%1"=="db-upgrade" goto db_upgrade
if "%1"=="db-downgrade" goto db_downgrade
if "%1"=="test" goto test
if "%1"=="test-backend" goto test_backend
if "%1"=="test-frontend" goto test_frontend
if "%1"=="lint" goto lint
if "%1"=="format" goto format
if "%1"=="build" goto build
if "%1"=="clean" goto clean

echo Unknown target %1. Run 'make help' for available commands.
exit /b 1

:help
echo PromptVault AI - Available Commands:
echo ------------------------------------
echo   make install           Install all dependencies (Frontend ^& Backend)
echo   make install-frontend  Install frontend npm dependencies
echo   make install-backend   Install backend Python dependencies
echo   make dev               Start local dev environment with Docker
echo   make dev-frontend      Start frontend dev server
echo   make dev-backend       Start backend uvicorn dev server
echo   make docker-up         Start Docker development containers
echo   make docker-down       Stop Docker containers
echo   make docker-prod       Start production Docker containers
echo   make docker-logs       View and follow Docker logs
echo   make docker-clean      Stop containers and remove volumes
echo   make db-migrate m=msg  Create Alembic migration
echo   make db-upgrade        Apply Alembic migrations
echo   make db-downgrade      Rollback last Alembic migration
echo   make test              Run all tests
echo   make lint              Run all linters
echo   make format            Format code
echo   make build             Build frontend application
echo   make clean             Clean cache and build artifacts
goto end

:install
cd /d "%~dp0frontend" && npm install && cd /d "%~dp0backend" && pip install -r requirements.txt
goto end

:install_frontend
cd /d "%~dp0frontend" && npm install
goto end

:install_backend
cd /d "%~dp0backend" && pip install -r requirements.txt
goto end

:dev
cd /d "%~dp0" && docker-compose up --build
goto end

:dev_frontend
cd /d "%~dp0frontend" && npm run dev
goto end

:dev_backend
cd /d "%~dp0backend" && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
goto end

:docker_up
cd /d "%~dp0" && docker-compose up --build
goto end

:docker_down
cd /d "%~dp0" && docker-compose down
goto end

:docker_prod
cd /d "%~dp0" && docker-compose -f docker-compose.prod.yml up --build -d
goto end

:docker_logs
cd /d "%~dp0" && docker-compose logs -f
goto end

:docker_clean
cd /d "%~dp0" && docker-compose down -v
goto end

:db_migrate
cd /d "%~dp0backend" && alembic revision --autogenerate -m "%2"
goto end

:db_upgrade
cd /d "%~dp0backend" && alembic upgrade head
goto end

:db_downgrade
cd /d "%~dp0backend" && alembic downgrade -1
goto end

:test
cd /d "%~dp0backend" && pytest && cd /d "%~dp0frontend" && npm test -- --run
goto end

:test_backend
cd /d "%~dp0backend" && pytest
goto end

:test_frontend
cd /d "%~dp0frontend" && npm test -- --run
goto end

:lint
cd /d "%~dp0backend" && ruff check . && cd /d "%~dp0frontend" && npm run lint
goto end

:format
cd /d "%~dp0backend" && ruff format . && cd /d "%~dp0frontend" && npm run format
goto end

:build
cd /d "%~dp0frontend" && npm run build
goto end

:clean
cd /d "%~dp0"
rmdir /s /q frontend\.next 2>nul
rmdir /s /q frontend\out 2>nul
rmdir /s /q frontend\coverage 2>nul
for /d /r backend %%d in (__pycache__) do @if exist "%%d" rmdir /s /q "%%d"
for /d /r backend %%d in (.pytest_cache) do @if exist "%%d" rmdir /s /q "%%d"
for /d /r backend %%d in (.ruff_cache) do @if exist "%%d" rmdir /s /q "%%d"
echo Clean completed.
goto end

:end
