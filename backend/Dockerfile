FROM adoptopenjdk:14-jdk-hotspot as builder

WORKDIR /app

# Set the Java home directory
ENV JAVA_HOME=/opt/java/openjdk

# Set the Java home for Gradle
ENV org.gradle.java.home=$JAVA_HOME

# Copy the Gradle build files
COPY build.gradle .
COPY gradlew .
COPY settings.gradle .
COPY gradle gradle

# Download and cache Gradle
RUN ./gradlew --version

# Copy the application source code
COPY . .

# Build the application JAR file
RUN ./gradlew shadowJar

### Stage 2: Create the final Docker image ###
FROM adoptopenjdk:14-jdk-hotspot

# Set the working directory in the container
WORKDIR /app

# Copy the application JAR from the builder stage
COPY --from=builder /app/build/libs/backend.jar backend.jar

# Set the command to run the application
CMD ["java", "-jar", "backend.jar"]
