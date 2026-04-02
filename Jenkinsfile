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
        
        stage("Tag and push to docker hub"){
            steps{
                echo "Logging in"
                withCredentials([
                    usernamePassword(
                        credentialsId:'dockerHubCred',
                        password: 'dockerHubPass',
                        username: 'dockerHubUser'
                    )
                ])
                sh "docker login -u ${env.username} -p ${env.password}"
                sh "docker tag realtime:latest ${env.username}/realtime:latest"
                sh "docker push ${env.username}/realtime:latest"
            }
        }

        stage('Run Image'){
            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerHubCred',
                    username: 'dokcerHubUser'
                )
            ])
            sh "docker run -d -p 3000:3000 ${env.username}/realtime:latest"
        }
    }
}
