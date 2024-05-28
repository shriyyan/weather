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

        stage('Build') {
            steps {
                script {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'mvn test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t shriyyann/weatherdata-pipeline .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                        sh 'docker push shriyyann/weatherdata-pipeline'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''
                    docker run -d -p 8080:8080 --name weatherdata-pipeline shriyyann/weatherdata-pipeline
                    '''
                }
            }
        }
    }
}
