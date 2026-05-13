@echo off
REM Estuda Mais - Docker Control Script for Windows
REM Usage: docker-start.bat [up|down|restart|logs|ps|rebuild|clean]

setlocal enabledelayedexpansion

set command=%1
if "%command%"=="" set command=up

set service=%2
if "!service!"=="" set service=all

echo.
echo ================================
echo Docker Control - Estuda Mais
echo ================================
echo.

goto %command%

:up
    echo 🚀 Starting All Services...
    docker-compose up -d
    echo ✅ Services started!
    echo.
    echo Frontend:    http://localhost:5173
    echo Backend API: http://localhost:8080
    echo phpMyAdmin:  http://localhost:8081
    echo MySQL:       localhost:3306
    goto end

:down
    echo 🛑 Stopping All Services...
    docker-compose down
    echo ✅ Services stopped!
    goto end

:restart
    echo 🔄 Restarting Services...
    docker-compose restart
    echo ✅ Services restarted!
    goto end

:logs
    echo 📋 Showing Logs...
    if "%service%"=="all" (
        docker-compose logs -f
    ) else (
        docker-compose logs -f %service%
    )
    goto end

:ps
    echo 📊 Service Status...
    docker-compose ps
    goto end

:rebuild
    echo 🔨 Rebuilding Images...
    if "%service%"=="all" (
        docker-compose build
        echo ✅ All images rebuilt!
    ) else (
        docker-compose build %service%
        echo ✅ %service% image rebuilt!
    )
    goto end

:clean
    echo 🧹 Cleaning Docker Resources...
    docker-compose down -v
    echo ✅ All containers and volumes removed!
    goto end

:help
    echo Usage: docker-start.bat [command] [service]
    echo.
    echo Commands:
    echo   up       - Start all services
    echo   down     - Stop all services
    echo   restart  - Restart all services
    echo   logs     - Show logs
    echo   ps       - Show service status
    echo   rebuild  - Rebuild Docker images
    echo   clean    - Remove all containers and volumes
    echo   help     - Show this help message
    echo.
    echo Services:
    echo   all      - All services (default)
    echo   api      - Backend API
    echo   frontend - Frontend (React)
    echo   mysql    - MySQL Database
    echo.
    echo Examples:
    echo   docker-start.bat up
    echo   docker-start.bat logs api
    echo   docker-start.bat restart frontend
    echo.
    goto end

:invalid_command
    echo ❌ Invalid command: %1
    call :help
    exit /b 1

:end
    echo.
    exit /b 0

