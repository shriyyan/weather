pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'shriyyann'
        DOCKER_PASSWORD = 'shriyan9187'
        NODEJS_HOME = 'C:\\Program Files\\nodejs'
        DOCKER_HOME = 'C:\\Program Files\\Docker\\Docker\\resources\\bin' // Add Docker path
        PATH = "${DOCKER_HOME};${NODEJS_HOME};C:\\Windows\\System32;C:\\Program Files\\Git\\cmd" // Include Docker path in PATH
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/shriyyan/weather.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install' // or 'yarn install' if using Yarn
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'npm run build' // or 'yarn build' if using Yarn
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t shriyyann/weatherdata-pipeline -f C:\\Users\\shris\\OneDrive\\Desktop\\React project\\weather-app\\Dockerfile .'
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
                    bat 'docker run -d -p 8080:80 --name weatherdata-pipeline shriyyann/weatherdata-pipeline'
                }
            }
        }
    }
}
