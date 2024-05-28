pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('shriyyann', 'shriyan9187')
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
                    docker.withRegistry('https://index.docker.io/v1/', 'shriyyann', 'shriyan9187') {
                        sh 'docker push shriyyann/weatherdata-pipeline'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''
                    docker run -d -p 8080:8080 --name weatherdata-pipeline --rm shriyyann/weatherdata-pipeline
                    '''
                }
            }
        }
    }
}
 
