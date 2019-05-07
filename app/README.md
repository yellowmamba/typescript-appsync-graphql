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

## Testing

We use `mocha` for testing our code and it is already added in `package.json` under `scripts`, so that we can simply run the following command to run our tests:

```bash
cd hello-world
npm install
npm run test
```

## Directory initialization

Make sure TypeScript is installed globally:
```
npm i -g typescript
```

Initialize directory and typescript config. Both `package.json` and `tsconfig.json` have been modified.
```
npm init -y
tsc --init
```

Install node type defintions:
```
npm i -D @types/node
```

Install `ts-node` globally:
```
npm i -g ts-node
```

## Compilation:

```
tsc
```

- This will build the `index.js` file in the ./dist dir as defined in `tsconfig.json`.  
- Running `tsc src/index.ts` will ignore the config file.  