# AWS AppSync GraphQL API

This repo creates a lambda function using AWS SAM, NodeJS and Typescript.

## Requirements

* AWS CLI already configured with Administrator permission
* [nodejs8.10 installed](https://nodejs.org/en/download/releases/)
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

## Example Queries

```
mutation storeMessage {
      storeMessage(
        deviceId: "F123", 
        timestamp: 1000, 
        message: "A test message"
      ) {
    deviceId
  }
}

query{
  getDeviceMessages(deviceId: "F123") {
   message
  }
}
```

#### Get a specific device message
```
query {
  getMessage(deviceId: "F12345", timestamp: 9000) {
    deviceId,
    message,
    messageType
  }
}

Result:

{
  "data": {
    "getMessage": {
      "deviceId": "F12345",
      "message": "Device Active",
      "messageType": "device_active_message"
    }
  }
}
```

#### Get all messages for a specific device
```
query{
  getDeviceMessages(deviceId: "F12345") {
   deviceId,
   message
  }
}

Result:

{
  "data": {
    "getDeviceMessages": [
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

## Example Mutations

```
mutation storeMessage {
      storeMessage(
        deviceId: "F123", 
        timestamp: 1000, 
        message: "A test message"
      ) {
    deviceId
  }
}
```