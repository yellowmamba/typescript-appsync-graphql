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

## Testing

The GraphQL lambdas can be tested locally against the [Amazon DynamoDB docker image](https://hub.docker.com/r/amazon/dynamodb-local):
```
docker run -p 8000:8000 amazon/dynamodb-local
```

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
```

#### Get all messages for a specific device
```
query{
  alleMessages(deviceId: "F12345") {
   deviceId,
   message
  }
}

Result:

{
  "data": {
    "allMessages": [
      {
        "deviceId": "F12345",
        "message": "A first test message"
      },
      {
        "deviceId": "F12345",
        "message": "Second message for this device"
      },
      {
        "deviceId": "F12345",
        "message": "Device Active"
      }
    ]
  }
```