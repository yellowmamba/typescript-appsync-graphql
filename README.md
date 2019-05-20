# AWS AppSync GraphQL API

This repo creates a lambda function using AWS SAM, NodeJS and Typescript.

## Requirements

* AWS CLI already configured with Administrator permission
* [nodejs10.x installed](https://nodejs.org/en/download/releases/)
* [Docker installed](https://www.docker.com/community-edition)
* Typescript installed

## Packaging and deployment

An S3 bucket must be created before deployment to hold the lambda code:

```
aws s3 mb s3://BUCKET_NAME
```

Set the follow environment variables:
```
export S3_BUCKET=
export STACK_NAME=
```

```
# Package and Build
make

# Deploy
make deploy
```

#### Packaging notes:
- The `devDependencies` are installed in order for `tsc` to compile the TypeScript code to Javascript
- The dev `node_modules` are then removed and the production dependencies are installed and zipped in the lambda package

## Testing

The GraphQL lambdas can be tested locally using the [Amazon DynamoDB docker image](https://hub.docker.com/r/amazon/dynamodb-local).

To execute unit tests, run:
```
make test
```

This will:
- Set the table name env var available to Jest  
- Launch the dynamodb docker image in a separate process with `port 8000` mapped  
- Execute unit tests. Before tests execute a dynamodb table is created in the docker image  
- Stops and removes the dynamodb image after test execution  

## Example Queries

```
mutation {
      storeMessage(
        deviceId: "F123", 
        message: "A new test message",
        messageType: "chat"
      ) {
    deviceId,
    timestamp
  }
}

Returns:
{
  "data": {
    "storeMessage": {
      "deviceId": "F123",
      "timestamp": 1558052249959,
    }
  }
}

query{
  getMessage(deviceId: "F123", timestamp: 1558052249959) {
   message,
   messageType
  }
}

# See all messages for the device
query{
  getDevice(deviceId: "F123") {
    deviceName,
    messages {
      timestamp,
      message
    }
  }
}
```