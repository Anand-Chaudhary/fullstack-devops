pipeline{
    agent any
    stages{
        stage('Build'){
            steps{
                echo 'Building...'
                sh 'docker build -t realtime:latest .'
                echo 'Build completed.'
            }
        }
        
        stage('Start Container'){
            steps{
                echo 'Starting container...'
                sh 'docker run -d -p 5000:3000 --name realtime-container realtime:latest'
                echo 'Container started.'
            }
        }
    }
}
