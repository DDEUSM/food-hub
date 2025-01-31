#!/bin/bash

docker compose down 
docker rm $(docker ps -qa) 
docker rmi $(docker image ls -q) 
docker compose up -d 