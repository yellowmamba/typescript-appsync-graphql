# AWS SAM Lambda with NodeJS / Typescript

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

## Testing

We use `mocha` for testing our code and it is already added in `package.json` under `scripts`, so that we can simply run the following command to run our tests:

```bash
cd hello-world
npm install
npm run test
```