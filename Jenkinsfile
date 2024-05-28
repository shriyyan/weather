pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'shriyyann'
        DOCKER_PASSWORD = 'shriyan9187'
        MAVEN_HOME = 'C:\\Users\\shris\\Downloads\\apache-maven-3.9.7-bin\\apache-maven-3.9.7' 
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-21\\bin' // Adjust this path to where Java is installed
        PATH = "${MAVEN_HOME}\\bin;${JAVA_HOME};C:\\Windows\\System32"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/shriyyan/weather.git'
            }
        }

        stage('Verify Environment Variables') {
            steps {
                script {
                    bat 'echo %JAVA_HOME%'
                    bat 'echo %MAVEN_HOME%'
                    bat 'echo %PATH%'
                }
            }
        }

        stage('Verify Java') {
            steps {
                script {
                    bat 'java -version'
                }
            }
        }

        stage('Verify Maven') {
            steps {
                script {
                    bat 'mvn -v'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat 'mvn test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t shriyyann/weatherdata-pipeline .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                        bat 'docker push shriyyann/weatherdata-pipeline'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    bat 'docker run -d -p 8080:8080 --name weatherdata-pipeline shriyyann/weatherdata-pipeline'
                }
            }
        }
    }
}
