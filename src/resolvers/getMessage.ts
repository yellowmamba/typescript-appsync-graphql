'use strict'

import { DynamoDB } from 'aws-sdk';
import bunyan from 'bunyan';

const dynamodb = new DynamoDB.DocumentClient();
const TableName = process.env.MESSAGES_DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "getMessageLambda"});

export interface GetMessageEventInput {
        deviceId: string,
        timestamp: number
}

export const GetMessage = async (event: GetMessageEventInput): Promise<any> => {
    logger.info(`Getting message from: ${TableName}`);
    logger.info(event);

    const dbParams: DynamoDB.DocumentClient.GetItemInput = {
        TableName,
        Key: {
            deviceId: event.deviceId,
            timestamp: event.timestamp
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