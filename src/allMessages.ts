'use strict'

import {DynamoDB} from 'aws-sdk';
import bunyan from 'bunyan';

const dynamodb = new DynamoDB.DocumentClient();
const MessagesTableName = process.env.MESSAGES_DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "allMessagesLambda"});

export interface AllMessagesEventInput {
    arguments: {
        deviceId: string
    }
}

export const handler = async (event: AllMessagesEventInput): Promise<any> => {
    logger.info(`Getting all messages from: ${MessagesTableName}`);
    logger.info(event);

    const dbParams: DynamoDB.DocumentClient.QueryInput = {
        TableName: MessagesTableName,
        KeyConditionExpression: "#deviceId = :deviceId",
        ExpressionAttributeNames: {
            "#deviceId": "deviceId"
        },
        ExpressionAttributeValues: {
            ":deviceId": event.arguments.deviceId
        }
    };

    try {
        const data = await dynamodb.query(dbParams).promise();
        logger.info('Successfully got messages:', data.Items);
        return data.Items;
    } catch (err) {
        logger.error('ERROR:', err);
        return err;
    }
}