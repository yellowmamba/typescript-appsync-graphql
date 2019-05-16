'use strict'

import { DynamoDB } from 'aws-sdk';
import bunyan from 'bunyan';

const dynamodb = new DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "storeMessageLambda"});

export interface EventInput {
    field: string,
    arguments: {
        deviceId: string,
        message: string,
        messageType: string
    }
}

interface Message {
    deviceId: string,
    timestamp: number,
    message: string,
    messageType: string
}

/**
 * Adds a timestamp to the incoming message data
 * @param messageInputData
 */
const constructMessageData = (messageInputData: EventInput): Message => {
    return {
        deviceId: messageInputData.arguments.deviceId,
        timestamp: new Date().getTime(),
        message: messageInputData.arguments.message,
        messageType: messageInputData.arguments.messageType
    }
}

export const handler = async (event: EventInput, _: any): Promise<any> => {
    logger.info(`Storing message to: ${TableName}`);
    const messageData = constructMessageData(event);

    const dbParams: DynamoDB.DocumentClient.PutItemInput = {
        TableName,
        Item: messageData
    };

    try {
        await dynamodb.put(dbParams).promise();
        logger.info('Successfully stored message:', dbParams);
        return dbParams.Item;
      } catch (err) {
        logger.error('ERROR:', err);
        return err;
    }
}