# Use an official OpenJDK 17 runtime as a base image
FROM openjdk:17-jdk-slim AS builder

# Set working directory inside container
WORKDIR /app

# Copy only the required files first (better for Docker caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Give execute permission to Maven wrapper and build the application
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Use a minimal JDK runtime for the final image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/myfitnesstracker-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]