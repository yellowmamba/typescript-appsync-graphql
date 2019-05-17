'use strict'

import { DynamoDB } from 'aws-sdk';
import bunyan from 'bunyan';

const dynamodb = new DynamoDB.DocumentClient();
const MessagesTableName = process.env.MESSAGES_DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "getMessageLambda"});

export interface GetMessageEventInput {
    arguments: {
        deviceId: string,
        timestamp: number
    }
}

export const handler = async (event: GetMessageEventInput): Promise<any> => {
    logger.info(`Getting message from: ${MessagesTableName}`);
    logger.info(event);

    const dbParams: DynamoDB.DocumentClient.GetItemInput = {
        TableName: MessagesTableName,
        Key: {
            deviceId: event.arguments.deviceId,
            timestamp: event.arguments.timestamp
        }
    };

    try {
        const data = await dynamodb.get(dbParams).promise();
        logger.info('Successfully got message:', data.Item);
        return data.Item;
      } catch (err) {
        logger.error('ERROR:', err);
        return err;
    }
}