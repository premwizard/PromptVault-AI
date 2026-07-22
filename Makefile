.PHONY: help install dev dev-frontend dev-backend build docker-up docker-down docker-prod docker-logs docker-clean test test-backend test-frontend lint lint-backend lint-frontend format format-backend format-frontend db-migrate db-upgrade db-downgrade clean

# Default target
.DEFAULT_GOAL := help

help: ## Display available commands
	@echo "PromptVault AI - Available Commands:"
	@echo "------------------------------------"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ------------------------------------------------------------------------------
# Dependency Management
# ------------------------------------------------------------------------------

install: install-frontend install-backend ## Install all dependencies (Frontend & Backend)

install-frontend: ## Install frontend npm dependencies
	cd frontend && npm install

install-backend: ## Install backend Python dependencies
	cd backend && pip install -r requirements.txt

# ------------------------------------------------------------------------------
# Local Development
# ------------------------------------------------------------------------------

dev: docker-up ## Start local development environment with Docker

dev-frontend: ## Start frontend dev server
	cd frontend && npm run dev

dev-backend: ## Start backend uvicorn dev server
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# ------------------------------------------------------------------------------
# Docker Operations
# ------------------------------------------------------------------------------

docker-up: ## Start Docker development containers
	docker-compose up --build

docker-down: ## Stop Docker containers
	docker-compose down

docker-prod: ## Start production Docker containers in detached mode
	docker-compose -f docker-compose.prod.yml up --build -d

docker-logs: ## View and follow Docker container logs
	docker-compose logs -f

docker-clean: ## Stop Docker containers and remove volumes
	docker-compose down -v

# ------------------------------------------------------------------------------
# Database & Migrations
# ------------------------------------------------------------------------------

db-migrate: ## Create a new Alembic migration (usage: make db-migrate m="migration message")
	cd backend && alembic revision --autogenerate -m "$(m)"

db-upgrade: ## Apply database migrations to head
	cd backend && alembic upgrade head

db-downgrade: ## Rollback the last database migration
	cd backend && alembic downgrade -1

# ------------------------------------------------------------------------------
# Testing
# ------------------------------------------------------------------------------

test: test-backend test-frontend ## Run all tests (Backend & Frontend)

test-backend: ## Run backend tests with pytest
	cd backend && pytest

test-frontend: ## Run frontend tests with vitest
	cd frontend && npm test -- --run

# ------------------------------------------------------------------------------
# Code Quality & Linting
# ------------------------------------------------------------------------------

lint: lint-backend lint-frontend ## Run linters for both Backend and Frontend

lint-backend: ## Run backend linters (ruff / flake8)
	cd backend && ruff check .

lint-frontend: ## Run frontend linter (ESLint)
	cd frontend && npm run lint

format: format-backend format-frontend ## Format code for both Backend and Frontend

format-backend: ## Format backend code using ruff
	cd backend && ruff format .

format-frontend: ## Format frontend code using Prettier
	cd frontend && npm run format

# ------------------------------------------------------------------------------
# Build & Cleanup
# ------------------------------------------------------------------------------

build: ## Build frontend application
	cd frontend && npm run build

clean: ## Clean cache and build artifacts
	@echo "Cleaning temporary files and build caches..."
	rm -rf frontend/.next frontend/out frontend/coverage frontend/node_modules/.cache
	find backend -type d -name "__pycache__" -exec rm -rf {} +
	find backend -type d -name ".pytest_cache" -exec rm -rf {} +
	find backend -type d -name ".ruff_cache" -exec rm -rf {} +
	find backend -type d -name ".mypy_cache" -exec rm -rf {} +
	@echo "Clean completed."
