# AWS SAM Lambda with NodeJS / Typescript

This repo creates a lambda function using AWS SAM, NodeJS and Typescript. The lambda implementation follows 
[this article](https://scotch.io/@nwayve/how-to-build-a-lambda-function-in-typescript) in structure.

## Requirements

* AWS CLI already configured with Administrator permission
* [nodejs6.10 installed](https://nodejs.org/en/download/releases/)
* [Docker installed](https://www.docker.com/community-edition)
* Typescript installed

## Packaging and deployment

An S3 bucket must be created before deployment to hold the lambda code:

```
aws s3 mb s3://BUCKET_NAME
```

Set the follow environment variables:
```
S3_BUCKET=
STACK_NAME=
```

```
./deploy.sh
```

## Build

```
npm run build
```