# lambda-view-server
A no-db web server using [Serverless](https://serverless.com/)/[AWS Lambda](https://aws.amazon.com/lambda/)

## Setup
### Local dependencies
Bring in project dependencies with [Yarn](https://yarnpkg.com)
```bash
yarn global add serverless webpack
yarn install
```

They can also be installed with npm if you prefer
```bash
npm install -g serverless webpack
npm install
```

### AWS setup
Follow the [credentials guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/) from Serverless to configure this project to use your AWS account.

### Environment variables
This project expects the following environment variables to be present
```
AWS_API_HOST: the url of the api that uses the lambda function (AWS Gateway API url)
AWS_S3_BUCKET: the S3 bucket where the static resources are deployed
AWS_STATIC_ROOT: the publicly accessible url of the S3 bucket
```
Configure those variables as appropriate for your system.

## Usage
To build the project and deploy to AWS
```bash
# using yarn
yarn deploy

# using npm
npm run deploy
```

To run the function locally
```bash
# with no parameters
sls invoke local --function server

# specify the route
sls invoke local --function server --data '{"pathParameters":{"route":"routeName"}}'
```
