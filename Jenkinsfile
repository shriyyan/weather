pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'shriyyann'
        DOCKER_PASSWORD = 'shriyan9187'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/shriyyan/weather.git'
            }
        }

        stage('Verify Shell') {
            steps {
                script {
                    bat 'C:\\Windows\\System32\\cmd.exe /c echo C:\\Windows\\System32'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'C:\\Windows\\System32\\cmd.exe /c mvn clean package'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat 'C:\\Windows\\System32\\cmd.exe /c mvn test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'C:\\Windows\\System32\\cmd.exe /c docker build -t shriyyann/weatherdata-pipeline .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat 'C:\\Windows\\System32\\cmd.exe /c docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                        bat 'C:\\Windows\\System32\\cmd.exe /c docker push shriyyann/weatherdata-pipeline'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    bat 'C:\\Windows\\System32\\cmd.exe /c docker run -d -p 8080:8080 --name weatherdata-pipeline shriyyann/weatherdata-pipeline'
                }
            }
        }
    }
}
