# syntax=docker/dockerfile:1
FROM mysql:8.0

# set environment variables
ENV MYSQL_DATABASE=SENSORS
ENV MYSQL_USER=BitSneak
ENV MYSQL_PASSWORD=123
ENV MYSQL_RANDOM_ROOT_PASSWORD=yes

# copy sql scripts to startup location of container
COPY ./scripts/ /docker-entrypoint-initdb.d/