'use strict'

import {DynamoDB} from 'aws-sdk';
import bunyan from 'bunyan';
import {configureDynamoDB} from './utils/lambdaConfig'
import {getUserFromRequestSession} from './utils/requestSession'

const dynamodb = configureDynamoDB();
const TableName = process.env.MESSAGES_DYNAMODB_TABLE || '';
const RequestSessionTableName = process.env.REQUEST_SESSION_DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "allMessagesLambda"});

export interface AllMessagesEventInput {
    arguments: {
        deviceId: string
    },
    identity: any,
    request: any
}

export const handler = async (event: AllMessagesEventInput): Promise<any> => {
    logger.info(event);
    const requestTraceId: string = event.request.headers['x-amzn-trace-id']
    const user = await getUserFromRequestSession(RequestSessionTableName, requestTraceId)
    logger.info({user: user})

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