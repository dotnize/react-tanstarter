#!/bin/bash

echo "Initiating dev setup with local PostgreSQL instance..."

# Auto-detect compose command
if command -v podman-compose &> /dev/null; then
    COMPOSE_CMD="podman-compose"
elif command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    echo "Error: Neither podman-compose nor docker-compose found!"
    exit 1
fi

echo "Using: $COMPOSE_CMD"

# Start PostgreSQL
echo "Starting PostgreSQL..."
$COMPOSE_CMD up -d

# Determine which dev command to run based on parameters
if [ -n "$1" ]; then
    DEV_CMD="dev:$1"
    echo "Starting $1 development server..."
else
    DEV_CMD="dev"
    echo "Starting all development servers..."
fi

# Start the development server
pnpm $DEV_CMD

# Cleanup function
cleanup() {
    echo "Shutting down..."
    $COMPOSE_CMD down
    exit 0
}

# Trap cleanup function on script exit
trap cleanup SIGINT SIGTERM EXIT