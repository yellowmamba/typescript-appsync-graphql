'use strict'

import {DynamoDB} from 'aws-sdk';
import bunyan from 'bunyan';
import {configureDynamoDB} from './utils/lambdaConfig'

const dynamodb = configureDynamoDB();
const TableName = process.env.MESSAGES_DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "allMessagesLambda"});

export interface AllMessagesEventInput {
    arguments: {
        deviceId: string
    },
    identity: any
}

export const handler = async (event: AllMessagesEventInput): Promise<any> => {
    logger.info(`Getting all messages from: ${TableName}`);
    logger.info(event);

    const dbParams: DynamoDB.DocumentClient.QueryInput = {
        TableName,
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