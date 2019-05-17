'use strict'

import {DynamoDB} from 'aws-sdk';
import bunyan from 'bunyan';

const dynamodb = new DynamoDB.DocumentClient();
const DevicesTableName = process.env.DEVICES_DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "getDeviceLambda"});

export interface GetDeviceEventInput {
    arguments: {
        deviceId: string
    }
}

export const handler = async (event: GetDeviceEventInput): Promise<any> => {
    logger.info(`Getting message from: ${DevicesTableName}`);
    logger.info(event);

    const dbParams: DynamoDB.DocumentClient.GetItemInput = {
        TableName: DevicesTableName,
        Key: {
            deviceId: event.arguments.deviceId
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