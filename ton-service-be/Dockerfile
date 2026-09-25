FROM eclipse-temurin:8-jdk-jammy AS build
WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY ./src ./src
RUN ./mvnw clean install

FROM eclipse-temurin:8-jdk-alpine

WORKDIR /TS/TS

ENV LOG_DIR=/var/log/ton-service
RUN mkdir -p ${LOG_DIR}

COPY --from=build /app/target/ton-service-be-1.0-SNAPSHOT.jar ./app.jar

ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=16301", "-jar", "app.jar"]
CMD ["--spring.profiles.active=dev"]