import AWS from "aws-sdk";
import bunyan from 'bunyan';

const logger = bunyan.createLogger({name: "localDynamodb"});

export const getDynamoDBClient = () => {
    return new AWS.DynamoDB({
        endpoint: "http://localhost:8000",
        region: "ap-southeast-2"
    });
}


export const initDb = (async () => {
    logger.info("Initializing local dynamodb table for testing");

    const ddbClient = getDynamoDBClient();
    const tableName = process.env.DYNAMODB_TABLE || "";

    try {
      await ddbClient.deleteTable({TableName: tableName}).promise()
    } catch (err) {
      if (err && err.code !== "ResourceNotFoundException") {
        throw err
      }
    }

    await ddbClient.waitFor("tableNotExists", {
      TableName: tableName,
    }).promise()

    const createParams: AWS.DynamoDB.Types.CreateTableInput = {
      TableName: tableName,
      AttributeDefinitions: [
        {AttributeName: "deviceId", AttributeType: "S"},
        {AttributeName: "timestamp", AttributeType: "N"},
      ],
      KeySchema: [
        {AttributeName: "deviceId", KeyType: "HASH"},
        {AttributeName: "timestamp", KeyType: "RANGE"},
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
      },
    }

    try {
      await ddbClient.createTable(createParams).promise()
    } catch (err) {
      if (err && err.code !== "ResourceInUseException") {
        throw err
      }
    }

    await ddbClient.waitFor("tableExists", {
      TableName: tableName,
    }).promise();

    return ddbClient;
});

export const teardownDb = (async () => {
    logger.info("Tearing down local dynamodb table");

    const ddbClient = getDynamoDBClient();
    const tableName = process.env.DYNAMODB_TABLE || "";

    const deleteParams: AWS.DynamoDB.Types.DeleteTableInput = {
        TableName: tableName
    }

    try {
        await ddbClient.deleteTable(deleteParams).promise()
    } catch (err) {
        // TODO: handle error
        logger.error("Error occurred while deleting local dynamodb table");
    }
});