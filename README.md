Hackathon Project: Automated CI/CD Pipeline for an Online Exam Portal

1. Project Overview
This project demonstrates a complete DevOps lifecycle by building, securing, deploying, and monitoring a simple Online Exam Portal application. The goal is to showcase proficiency in modern DevOps practices using a popular toolchain, creating an automated pipeline from code commit to production monitoring.
Core Concept: Implement a robust CI/CD (Continuous Integration and Continuous Deployment) pipeline that automatically deploys a containerized application to the cloud, with integrated security scanning and infrastructure monitoring.

2. Technology Stack & Tools
 <img width="1004" height="483" alt="image" src="https://github.com/user-attachments/assets/3d8e9e99-2751-4551-8ec4-4883735be388" />


3. System Architecture & Execution Plan
The project follows a clear, step-by-step execution plan to ensure a professional and successful implementation.
High-Level Workflow
1.	Develop a simple application locally.
2.	Containerize it with Docker.
3.	Automate the entire process using a Jenkins pipeline.
4.	Secure the container image with Trivy scans.
5.	Deploy the application to a cloud server.
6.	Monitor the deployment with Prometheus and Grafana.

Detailed Component Setup Plan
 

<img width="751" height="447" alt="image" src="https://github.com/user-attachments/assets/8e5c1a67-4045-4262-bcc8-f1018953fbad" />




4. Step-by-Step Implementation Guide
Phase 1: Application Development & Version Control
1.	Develop the App: Create a simple Online Exam Portal using Node.js or Flask (e.g., user login, display questions, submit answers).
2.	Initialize Git: Create a local Git repository for the project.
3.	Push to GitHub: Create a remote repository on GitHub and push your code. This serves as the single source of truth.
Phase 2: Infrastructure & CI/CD Setup on AWS
1.	Provision EC2 Instance: Manually launch an AWS EC2 instance (e.g., Ubuntu t2.medium) to host our tools.
2.	SSH into EC2: Connect to your instance via SSH.
3.	Install Tools: On the EC2 instance, install the following:
o	Docker: To run the application and monitoring tools in containers.
o	Jenkins: As a Docker container or via the native package manager.
o	Trivy: For vulnerability scanning.
o	Terraform: For infrastructure automation.
Phase 3: Pipeline Configuration in Jenkins
1.	Access Jenkins: Open the Jenkins web UI.
2.	Create a Pipeline Job: Set up a new "Pipeline" job.
3.	Configure Source Code Management: Point the pipeline to your GitHub repository.
4.	Write the Pipeline Script (Jenkinsfile): Define the pipeline stages in a Jenkinsfile in your repo or directly in the UI.
Phase 4: Defining the CI/CD Pipeline Stages
The pipeline is the core of this project and should include the following stages:
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-exam-app-repo.git'
            }
        }
        stage('Build & Dockerize') {
            steps {
                script {
                    docker.build("your-username/exam-app:${env.BUILD_ID}")
                }
            }
        }
        stage('Security Scan') {
            steps {
                script {
                    sh 'trivy image your-username/exam-app:${env.BUILD_ID}'
                }
            }
        }
        stage('Deploy with Terraform') {
            steps {
                script {
                    // Assuming Terraform config is in a /terraform directory
                    dir('terraform') {
                        sh 'terraform init && terraform apply -auto-approve'
                    }
                }
            }
        }
        stage('Deploy App') {
            steps {
                script {
                    sh 'docker run -d -p 80:5000 --name running-exam-app your-username/exam-app:${env.BUILD_ID}'
                }
            }
        }
    }
}

Phase 5: Monitoring Setup
1.	Run Prometheus: Start a Prometheus container, configured to scrape metrics from your application.
2.	Run Grafana: Start a Grafana container and link it to the Prometheus data source.
3.	Create Dashboards: In Grafana, build dashboards to visualize key metrics like HTTP requests, response times, and server health.

5. Expected Deliverables & Hackathon Submission
A complete submission will demonstrate the following workflow:
 <img width="814" height="464" alt="image" src="https://github.com/user-attachments/assets/957ae454-58e7-490a-b750-e09ac2c191be" />


6. Experimental Setup and Outputs
•	Fast & Reliable Performance: Quick login, exam loading, and instant evaluation.
•	Accurate Auto-Grading: Objective questions evaluated with 100% accuracy.
•	User & Database Efficiency: Supports multiple students simultaneously without lag.
•	Insightful Analytics: Real-time scores, performance charts, and admin reports.



<img width="975" height="513" alt="image" src="https://github.com/user-attachments/assets/1a7816b4-0e03-4490-91d2-49d7e41a8b31" />
<img width="975" height="510" alt="image" src="https://github.com/user-attachments/assets/400d549e-0c99-473c-8180-904aa3bcdb2e" />
<img width="975" height="511" alt="image" src="https://github.com/user-attachments/assets/62079090-1790-4b50-a904-23b05140d468" />
<img width="975" height="513" alt="image" src="https://github.com/user-attachments/assets/4aafb3bf-c85e-4cec-9c97-c3f2c76d71aa" />
<img width="975" height="484" alt="image" src="https://github.com/user-attachments/assets/a306333c-6534-4ab9-87a9-5f06e2248f43" />
<img width="961" height="710" alt="image" src="https://github.com/user-attachments/assets/2ccad28e-52a1-4d9e-bd2c-3890057575df" />
<img width="961" height="1350" alt="image" src="https://github.com/user-attachments/assets/b0f07814-9514-4c73-947c-d06d2eeaff7d" />
<img width="975" height="265" alt="image" src="https://github.com/user-attachments/assets/1a9cef64-e835-4d9d-8571-0280b24c3020" />


 
 


 
 
