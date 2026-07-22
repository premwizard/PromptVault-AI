param (
    [string]$Target = "help",
    [string]$m = ""
)

$ErrorActionPreference = "Stop"

switch ($Target.ToLower()) {
    "help" {
        Write-Host "PromptVault AI - Available Commands (PowerShell Runner):" -ForegroundColor Cyan
        Write-Host "--------------------------------------------------------" -ForegroundColor Gray
        Write-Host "  install           Install all dependencies (Frontend & Backend)"
        Write-Host "  install-frontend  Install frontend npm dependencies"
        Write-Host "  install-backend   Install backend Python dependencies"
        Write-Host "  dev               Start local dev environment with Docker"
        Write-Host "  dev-frontend      Start frontend dev server"
        Write-Host "  dev-backend       Start backend uvicorn dev server"
        Write-Host "  docker-up         Start Docker development containers"
        Write-Host "  docker-down       Stop Docker containers"
        Write-Host "  docker-prod       Start production Docker containers"
        Write-Host "  docker-logs       View and follow Docker logs"
        Write-Host "  docker-clean      Stop containers and remove volumes"
        Write-Host "  db-migrate        Create Alembic migration (-m 'msg')"
        Write-Host "  db-upgrade        Apply Alembic migrations"
        Write-Host "  db-downgrade      Rollback last Alembic migration"
        Write-Host "  test              Run all tests"
        Write-Host "  test-backend      Run backend tests with pytest"
        Write-Host "  test-frontend     Run frontend tests"
        Write-Host "  lint              Run all linters"
        Write-Host "  format            Format backend and frontend code"
        Write-Host "  build             Build frontend application"
        Write-Host "  clean             Clean cache and build artifacts"
    }
    "install" {
        Push-Location frontend; npm install; Pop-Location
        Push-Location backend; pip install -r requirements.txt; Pop-Location
    }
    "install-frontend" {
        Push-Location frontend; npm install; Pop-Location
    }
    "install-backend" {
        Push-Location backend; pip install -r requirements.txt; Pop-Location
    }
    "dev" {
        docker-compose up --build
    }
    "dev-frontend" {
        Push-Location frontend; npm run dev; Pop-Location
    }
    "dev-backend" {
        Push-Location backend; uvicorn app.main:app --reload --host 0.0.0.0 --port 8000; Pop-Location
    }
    "docker-up" {
        docker-compose up --build
    }
    "docker-down" {
        docker-compose down
    }
    "docker-prod" {
        docker-compose -f docker-compose.prod.yml up --build -d
    }
    "docker-logs" {
        docker-compose logs -f
    }
    "docker-clean" {
        docker-compose down -v
    }
    "db-migrate" {
        if (-not $m) { $m = "migration" }
        Push-Location backend; alembic revision --autogenerate -m "$m"; Pop-Location
    }
    "db-upgrade" {
        Push-Location backend; alembic upgrade head; Pop-Location
    }
    "db-downgrade" {
        Push-Location backend; alembic downgrade -1; Pop-Location
    }
    "test" {
        Push-Location backend; pytest; Pop-Location
        Push-Location frontend; npm test -- --run; Pop-Location
    }
    "test-backend" {
        Push-Location backend; pytest; Pop-Location
    }
    "test-frontend" {
        Push-Location frontend; npm test -- --run; Pop-Location
    }
    "lint" {
        Push-Location backend; ruff check .; Pop-Location
        Push-Location frontend; npm run lint; Pop-Location
    }
    "lint-backend" {
        Push-Location backend; ruff check .; Pop-Location
    }
    "lint-frontend" {
        Push-Location frontend; npm run lint; Pop-Location
    }
    "format" {
        Push-Location backend; ruff format .; Pop-Location
        Push-Location frontend; npm run format; Pop-Location
    }
    "format-backend" {
        Push-Location backend; ruff format .; Pop-Location
    }
    "format-frontend" {
        Push-Location frontend; npm run format; Pop-Location
    }
    "build" {
        Push-Location frontend; npm run build; Pop-Location
    }
    "clean" {
        Write-Host "Cleaning temporary files..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force -ErrorAction SilentlyContinue frontend/.next, frontend/out, frontend/coverage
        Get-ChildItem -Path backend -Recurse -Directory -Filter "__pycache__" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force
        Get-ChildItem -Path backend -Recurse -Directory -Filter ".pytest_cache" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force
        Get-ChildItem -Path backend -Recurse -Directory -Filter ".ruff_cache" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force
        Write-Host "Clean completed." -ForegroundColor Green
    }
    Default {
        Write-Host "Unknown target '$Target'. Run '.\make.ps1 help' for available targets." -ForegroundColor Red
    }
}
