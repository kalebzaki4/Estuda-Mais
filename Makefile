# Estuda Mais Docker Makefile
# Simplifies common Docker operations

.PHONY: help up down restart logs ps build rebuilt clean health shell-api shell-frontend shell-mysql

help:
	@echo "Estuda Mais - Available Docker Commands:"
	@echo ""
	@echo "  make up                - Start all services"
	@echo "  make down              - Stop all services"
	@echo "  make restart           - Restart all services"
	@echo "  make logs              - Show logs from all services"
	@echo "  make logs-api          - Show API logs only"
	@echo "  make logs-frontend     - Show Frontend logs only"
	@echo "  make logs-mysql        - Show MySQL logs only"
	@echo "  make ps                - Show service status"
	@echo "  make build             - Rebuild all images"
	@echo "  make build-api         - Rebuild API image"
	@echo "  make build-frontend    - Rebuild Frontend image"
	@echo "  make clean             - Remove all containers and volumes"
	@echo "  make health            - Check services health"
	@echo "  make shell-api         - Access API container shell"
	@echo "  make shell-frontend    - Access Frontend container shell"
	@echo "  make shell-mysql       - Access MySQL container shell"
	@echo "  make help              - Show this help message"

up:
	docker-compose up -d
	@echo "✅ Services started!"
	@echo "Frontend:    http://localhost:5173"
	@echo "Backend API: http://localhost:8080"
	@echo "phpMyAdmin:  http://localhost:8081"

down:
	docker-compose down
	@echo "✅ Services stopped!"

restart:
	docker-compose restart
	@echo "✅ Services restarted!"

logs:
	docker-compose logs -f

logs-api:
	docker-compose logs -f api

logs-frontend:
	docker-compose logs -f frontend

logs-mysql:
	docker-compose logs -f mysql

ps:
	docker-compose ps

build:
	docker-compose build

build-api:
	docker-compose build api

build-frontend:
	docker-compose build frontend

clean:
	docker-compose down -v
	@echo "✅ All containers and volumes removed!"

health:
	@echo "Checking service health..."
	@docker-compose exec -T mysql mysqladmin ping -h localhost || echo "MySQL: ❌"
	@docker-compose exec -T api curl -s http://localhost:8080/actuator/health || echo "API: ❌"
	@docker-compose exec -T frontend wget -q http://localhost:5173 -O - || echo "Frontend: ❌"

shell-api:
	docker-compose exec api sh

shell-frontend:
	docker-compose exec frontend sh

shell-mysql:
	docker-compose exec mysql mysql -u app_user -p estuda_mais_db

.DEFAULT_GOAL := help

