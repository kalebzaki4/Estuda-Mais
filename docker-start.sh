#!/bin/bash

# Estuda Mais - Docker Control Script
# Usage: ./docker-start.sh [up|down|restart|logs|ps|rebuild]

set -e

command=${1:-up}
service=${2:-all}

function print_header() {
    echo ""
    echo "================================"
    echo "$1"
    echo "================================"
    echo ""
}

case $command in
    up)
        print_header "🚀 Starting All Services"
        docker-compose up -d
        echo "✅ Services started!"
        echo ""
        echo "Frontend:    http://localhost:5173"
        echo "Backend API: http://localhost:8080"
        echo "phpMyAdmin:  http://localhost:8081"
        echo "MySQL:       localhost:3306"
        ;;
    down)
        print_header "🛑 Stopping All Services"
        docker-compose down
        echo "✅ Services stopped!"
        ;;
    restart)
        print_header "🔄 Restarting Services"
        docker-compose restart
        echo "✅ Services restarted!"
        ;;
    logs)
        print_header "📋 Showing Logs"
        if [ "$service" = "all" ]; then
            docker-compose logs -f
        else
            docker-compose logs -f $service
        fi
        ;;
    ps)
        print_header "📊 Service Status"
        docker-compose ps
        ;;
    rebuild)
        print_header "🔨 Rebuilding Images"
        if [ "$service" = "all" ]; then
            docker-compose build
            echo "✅ All images rebuilt!"
        else
            docker-compose build $service
            echo "✅ $service image rebuilt!"
        fi
        ;;
    clean)
        print_header "🧹 Cleaning Docker Resources"
        docker-compose down -v
        echo "✅ All containers and volumes removed!"
        ;;
    *)
        print_header "Usage:"
        echo "$0 [command] [service]"
        echo ""
        echo "Commands:"
        echo "  up       - Start all services"
        echo "  down     - Stop all services"
        echo "  restart  - Restart all services"
        echo "  logs     - Show logs"
        echo "  ps       - Show service status"
        echo "  rebuild  - Rebuild Docker images"
        echo "  clean    - Remove all containers and volumes"
        echo ""
        echo "Services:"
        echo "  all      - All services (default)"
        echo "  api      - Backend API"
        echo "  frontend - Frontend (React)"
        echo "  mysql    - MySQL Database"
        echo ""
        echo "Examples:"
        echo "  $0 up"
        echo "  $0 logs api"
        echo "  $0 restart frontend"
        echo ""
        exit 1
        ;;
esac

