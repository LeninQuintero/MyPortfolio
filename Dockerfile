FROM amazoncorretto:11-alpine-jdk

MAINTAINER LeninQuintero

COPY target/portfolio-0.0.1-SNAPSHOT.jar my-portfolio-app.jar

ENTRYPOINT ["java","-jar","/my-portfolio-app.jar"]
