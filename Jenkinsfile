// This is the final, production-ready Jenkinsfile.

pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'online-exam-portal-frontend'
        CONTAINER_NAME = 'online-exam-portal-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out the source code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building the Docker image: ${env.IMAGE_NAME}:latest..."
                sh "docker build -t ${env.IMAGE_NAME}:latest ."
            }
        }

        stage('Security Scan with Trivy') {
            steps {
                echo "Scanning ${env.IMAGE_NAME}:latest for vulnerabilities..."
                sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy:latest image --exit-code 1 --severity HIGH,CRITICAL ${env.IMAGE_NAME}:latest
                """
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    echo "Deploying the new container: ${env.CONTAINER_NAME}..."
                    // We check if an old container exists. The '|| true' ensures these commands
                    // do not fail the pipeline if the container doesn't exist (e.g., on the first run).
                    echo "Attempting to stop and remove old container if it exists..."
                    sh "docker stop ${env.CONTAINER_NAME} || true"
                    sh "docker rm ${env.CONTAINER_NAME} || true"
                    
                    echo "Starting the new application container on port 8081..."
                    sh "docker run -d --name ${env.CONTAINER_NAME} -p 8081:80 ${env.IMAGE_NAME}:latest"
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ SUCCESS! The pipeline has completed.'
            echo "A new version has been deployed and is running at http://<your-server-ip>:8081"
        }
        failure {
            echo '❌ Pipeline failed. Please check the Console Output for the error.'
        }
    }
}
