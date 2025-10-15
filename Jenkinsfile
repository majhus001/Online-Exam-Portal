// This Jenkinsfile defines the CI/CD pipeline for the Online Exam Portal

pipeline {
    // Run the pipeline on any available Jenkins agent
    agent any

    // Define the stages of the pipeline
    stages {
        // STAGE 1: Checkout the source code from GitHub
        stage('Checkout Code') {
            steps {
                echo 'Checking out the source code from the repository...'
                // This command is automatically provided by the Jenkins job configuration
                checkout scm
            }
        }

        // STAGE 2: Build a new Docker image using docker-compose
        stage('Build Docker Image') {
            steps {
                echo 'Building the new Docker image...'
                // Run docker-compose build. --no-cache ensures a fresh build every time.
                // We run this inside the 'Online-Exam-Portal' directory.
                dir('Online-Exam-Portal') {
                   sh 'docker-compose build --no-cache'
                }
            }
        }

        // STAGE 3: Scan the image for vulnerabilities with Trivy
        stage('Security Scan with Trivy') {
            steps {
                echo 'Scanning the Docker image for CRITICAL and HIGH vulnerabilities...'
                // --exit-code 1 will cause the pipeline to fail if vulnerabilities are found
                // --severity HIGH,CRITICAL ensures we only fail on serious issues
                dir('Online-Exam-Portal') {
                    sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL online-exam-portal_frontend:latest'
                }
            }
        }

        // STAGE 4: Deploy the new version of the application
        stage('Deploy Application') {
            steps {
                echo 'Deploying the new, secure version of the application...'
                // 'docker-compose down' stops and removes the old container.
                // 'docker-compose up -d' starts the new container with the updated image.
                dir('Online-Exam-Portal') {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    // Define actions that run at the end of the pipeline
    post {
        always {
            echo 'Pipeline has finished.'
        }
        success {
            echo '✅ New version deployed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Please check the logs.'
        }
    }
}
