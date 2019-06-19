'use strict'

import {DynamoDB} from 'aws-sdk';
import bunyan from 'bunyan';
import {configureDynamoDB} from './utils/lambdaConfig'
import {getUserFromRequestSession} from './utils/requestSession'

const dynamodb = configureDynamoDB();
const TableName = process.env.DEVICES_DYNAMODB_TABLE || '';
const RequestSessionTableName = process.env.REQUEST_SESSION_DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "allDevicesLambda"});

export interface AllDevicesEventInput {
    arguments: {
        nextToken?: string
    },
    identity: any,
    request: any
}

export const handler = async (event:AllDevicesEventInput): Promise<any> => {
    logger.info(event);
    const requestTraceId: string = event.request.headers['x-amzn-trace-id']
    const user = await getUserFromRequestSession(RequestSessionTableName, requestTraceId)
    logger.info({user: user})

    const dbParams: DynamoDB.DocumentClient.ScanInput = {
        TableName
    };

    try {
        const data = await dynamodb.scan(dbParams).promise();
        // return scan with mocked token value
        const paginatedResults = {
            items: data.Items,
            nextToken: "TOKEN1234",
        }
        logger.info('Successfully got device results', paginatedResults);
        return paginatedResults;
    } catch (err) {
        logger.error('ERROR:', err);
        return err;
    }
}