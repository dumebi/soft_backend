#!/usr/bin/env bash
docker-compose up -d
sleep 10s
docker exec -it test-backend npm run test