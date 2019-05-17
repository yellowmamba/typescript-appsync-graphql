'use strict'

import { DynamoDB } from 'aws-sdk';
import bunyan from 'bunyan';

const dynamodb = new DynamoDB.DocumentClient();
const TableName = process.env.MESSAGES_DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "allMessagesLambda"});

export interface AllMessagesEventInput {
    deviceId: string
}

export const AllMessages = async (event: AllMessagesEventInput): Promise<any> => {
    logger.info(`Getting all messages from: ${TableName}`);
    logger.info(event);

    const dbParams: DynamoDB.DocumentClient.QueryInput = {
        TableName,
        IndexName: event.deviceId
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