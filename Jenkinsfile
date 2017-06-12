#!groovy
node {
    def TOOLS = ["node-7"]
    def ENVIRONMENT = (env.BRANCH_NAME ==~ /test|master/) ? env.BRANCH_NAME : "dev";
    def GIT_BRANCH = (env.BRANCH_NAME ==~ /dev|test|master/) ? "HEAD" : env.BRANCH_NAME;
    def DOMAIN = (env.BRANCH_NAME ==~ /master/) ? ".agyo.io" : "-${ENVIRONMENT}.azurewebsites.net"
    def FOLDER = "summary-mac"
    def ENDPOINTS = [

    ]

    try {
        stage('Checkout') {
            checkout scm
        }

        stage('Build environment') {
            for (String t : TOOLS) {
                def toolPath = tool(t);
                env.PATH = "${toolPath}/bin:${env.PATH}"
            }
        }

        stage('Build and Test') {
            sh 'npm --version'
            sh 'npm install'
            sh 'npm test'
        }

        def storageAccounts = [
                master: "macsummary",
                test  : "macsummary",
                dev   : "macsummary"
        ]

        def buildEnv = [
                "AZURE_STORAGE_ACCOUNT=${storageAccounts[ENVIRONMENT]}",
                "AZURE_STORAGE_CONTAINER_NAME=static-apps",
                "AZURE_STORAGE_FOLDER=${FOLDER}",
                "NODE_ENV=production",
                "GIT_BRANCH=${GIT_BRANCH}"
        ]
        buildEnv.addAll(ENDPOINTS)
        def azureCredentials = [$class: "StringBinding", credentialsId: "AZURE_STATIC_STORAGE_ACCESS_KEY_${ENVIRONMENT}", variable: "AZURE_STORAGE_ACCESS_KEY"]

        stage('Deploy') {
            withEnv(buildEnv) {
                withCredentials([azureCredentials]) {
                    sh 'npm run deploy'
                }
            }
        }

        stage('Notify') {
            def shortCommit = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()
            def commitAuthor = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' HEAD").trim()
            slackSend color: 'good', message: "B2B - ${JOB_NAME} (${shortCommit}) - ${BUILD_DISPLAY_NAME} Success (<${BUILD_URL}|Open>) - Triggered by ${commitAuthor}"
        }
    } catch (err) {
        slackSend color: 'danger', message: "B2B - ${JOB_NAME} - ${BUILD_DISPLAY_NAME} Failure (<${BUILD_URL}|Open>) - Caught: ${err}"
        currentBuild.result = 'FAILURE'
    }
}
