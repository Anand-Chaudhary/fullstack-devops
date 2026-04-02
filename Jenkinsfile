pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'docker build -t realtime:latest .'
                echo 'Build completed.'
            }
        }

        stage('Tag and push to docker hub') {
            steps {
                echo "Logging in"
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerHubCred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
                    sh "docker tag realtime:latest ${DOCKER_USER}/realtime:latest"
                    sh "docker push ${DOCKER_USER}/realtime:latest"
                }
            }
        }

        stage('Run Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerHubCred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh "docker rm -f realtime || true"
                    sh "docker run -d -p 3000:3000 ${DOCKER_USER}/realtime:latest"
                }
            }
        }
    }
}
