#!/bin/bash
docker compose down
source publish rm -f babymed-front -t latest
docker compose up -d