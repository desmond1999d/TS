#!/bin/bash

export MYSQLDB_USER=root
export MYSQLDB_ROOT_PASSWORD=root
export MYSQLDB_DATABASE=ton-service
export MYSQLDB_LOCAL_PORT=3307
export MYSQLDB_DOCKER_PORT=3306

helm install list-keep ./ --set spring.datasource.url=jdbc:mysql://mysqldb:$MYSQLDB_DOCKER_PORT/$MYSQLDB_DATABASE?useSSL=false&allowPublicKeyRetrieval=true,spring.datasource.username=$MYSQLDB_USER,spring.datasource.password=$MYSQLDB_ROOT_PASSWORD,spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect,spring.jpa.hibernate.ddl-auto=none