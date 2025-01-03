pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // Đã cấu hình trước trong Jenkinssss
    }

    stages {
        stage('Clone Code') {
            steps {
                echo 'Cloning code from GitHub...'
                git branch: 'main', url: 'https://github.com/20127200/MMTNC-Project3.git'
            }
        }
        
    stage('Check Docker') {
        steps {
            script {
                echo 'Checking Docker status...'
                def dockerStatus = bat(script: 'docker info >nul 2>&1', returnStatus: true)
                if (dockerStatus != 0) {
                    error 'Docker is not running. Please start Docker and retry the pipeline.'
                } else {
                    echo 'Docker is already running.'
                }
            }
        }
    }
    
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', 
                                          usernameVariable: 'DOCKER_USER', 
                                          passwordVariable: 'DOCKER_PASS')]) {
                echo 'Logging into Docker Hub...'
                bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                echo 'Building Backend Docker Image...'
                        bat 'docker build -t 20127200/backend-image:latest "./Back end"'
                }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building Frontend Docker Image...'
                bat 'docker build -t 20127200/frontend-image:latest "./Front end"'
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    echo 'Logging into Docker Hub...'
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        echo 'Pushing Backend Image...'
                        bat 'docker push 20127200/backend-image:latest'
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    echo 'Logging into Docker Hub...'
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        echo 'Pushing Frontend Image...'
                        bat 'docker push 20127200/frontend-image:latest'
                    }
                }
            }
        }
        
        stage('Clean Up Backend Container') {
            steps {
                echo 'Stopping and Removing Backend Container...'
                bat 'docker rm -f backend-container || true'
            }
        }

        stage('Clean Up Frontend Container') {
            steps {
                echo 'Stopping and Removing Frontend Container...'
                bat 'docker rm -f frontend-container || true'
            }
        }
        
        stage('Deploy Backend Container') {
            steps {
                echo 'Deploying Backend Container...'
                bat 'docker run --pull always -d -p 3000:3000 --name backend-container 20127200/backend-image:latest'
            }
        }

        stage('Deploy Frontend Container') {
            steps {
                echo 'Deploying Frontend Container...'
                bat 'docker run --pull always -d -p 3001:3001 --name frontend-container 20127200/frontend-image:latest'
            }
        }
    }
}
