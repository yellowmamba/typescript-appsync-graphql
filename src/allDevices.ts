'use strict'

import {DynamoDB} from 'aws-sdk';
import bunyan from 'bunyan';
import {configureDynamoDB} from './utils/lambdaConfig'

const dynamodb = configureDynamoDB();
const TableName = process.env.DEVICES_DYNAMODB_TABLE|| '';
const logger = bunyan.createLogger({name: "allDevicesLambda"});

export interface AllDevicesEventInput {
    arguments: {
        nextToken?: string
    },
    identity: any,
    user: any
}

export const handler = async (event:AllDevicesEventInput): Promise<any> => {
    logger.info(event);

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
        if (paginatedResults.items) {
            paginatedResults.items.forEach( (i: any) => { i.user = event.user; });
        }
        logger.info('Successfully got device results', paginatedResults);
        return paginatedResults;
    } catch (err) {
        logger.error('ERROR:', err);
        return err;
    }
}