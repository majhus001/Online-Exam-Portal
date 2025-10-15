// This is the correct and complete Jenkinsfile for your CI/CD pipeline.

pipeline {
    // Run the pipeline on any available Jenkins agent
    agent any

    // Define environment variables to make the pipeline clear and easy to manage
    environment {
        IMAGE_NAME     = 'online-exam-portal-frontend'
        CONTAINER_NAME = 'online-exam-portal-app'
    }

    // Define the sequence of stages for the pipeline
    stages {

        // STAGE 1: Get the latest code from GitHub
        stage('Checkout Code') {
            steps {
                echo 'Checking out the source code from the repository...'
                // 'checkout scm' is a built-in Jenkins step to pull code
                // from the repository configured in the pipeline job.
                checkout scm
            }
        }

        // STAGE 2: Build the application into a Docker image
        stage('Build Docker Image') {
            steps {
                echo "Building the Docker image: ${env.IMAGE_NAME}:latest..."
                // Use the standard 'docker build' command.
                // The '-t' flag tags the image with a name for easy reference.
                // The '.' tells Docker to find the 'Dockerfile' in the current directory.
                sh "docker build -t ${env.IMAGE_NAME}:latest ."
            }
        }

        // STAGE 3: Scan the newly built image for security vulnerabilities
        stage('Security Scan with Trivy') {
            steps {
                echo "Scanning ${env.IMAGE_NAME}:latest for vulnerabilities..."
                // This is a common pattern: run a security tool inside its own container.
                // We mount the Docker socket ('-v /var/run/docker.sock...') so the
                // Trivy container can access and scan the image we just built.
                // '--exit-code 1' will fail the pipeline if Trivy finds any issues.
                // '--severity HIGH,CRITICAL' ensures we only stop for serious vulnerabilities.
                sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy:latest image --exit-code 1 --severity HIGH,CRITICAL ${env.IMAGE_NAME}:latest
                """
            }
        }

        // STAGE 4: Deploy the application by running the new container
        stage('Deploy Application') {
            steps {
                script {
                    echo "Deploying the new container: ${env.CONTAINER_NAME}..."
                    // A script block allows for more complex logic.
                    // First, we check if an old version of the container exists.
                    def oldContainer = sh(script: "docker ps -a -q --filter name=${env.CONTAINER_NAME}", returnStatus: true)
                    if (oldContainer == 0) {
                        echo "Found and removing old container..."
                        sh "docker stop ${env.CONTAINER_NAME}"
                        sh "docker rm ${env.CONTAINER_NAME}"
                    }
                    
                    echo "Starting the new application container..."
                    // Run the new container from the image we just built and scanned.
                    // '-d' runs it in detached mode (in the background).
                    // '--name' gives the container a predictable name.
                    // '-p 8081:80' maps port 8081 on the server to port 80 in the container.
                    sh "docker run -d --name ${env.CONTAINER_NAME} -p 8081:80 ${env.IMAGE_NAME}:latest"
                }
            }
        }
    }
    
    // The 'post' block defines actions to run at the end of the pipeline
    post {
        // Always runs, regardless of success or failure
        always {
            echo 'Pipeline has finished.'
        }
        // Runs only if all stages were successful
        success {
            echo '✅ New version deployed successfully! Access it on port 8081.'
        }
        // Runs only if any stage failed
        failure {
            echo '❌ Pipeline failed. Please check the Console Output for the error.'
        }
    }
}
