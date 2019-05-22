'use strict'

import {DynamoDB} from 'aws-sdk';
import bunyan from 'bunyan';

import {configureDynamoDB} from './utils/lambdaConfig'

const dynamodb = configureDynamoDB();
const TableName = process.env.DYNAMODB_TABLE || '';
const logger = bunyan.createLogger({name: "getDeviceLambda"});

export interface GetDeviceEventInput {
    arguments: {
        deviceId: string
    }
}

export const handler = async (event: GetDeviceEventInput): Promise<any> => {
    logger.info(`Getting device from: ${TableName}`);
    logger.info(event);

    return {
        "deviceId": event.arguments.deviceId,
        "deviceName": "name"
    }

    // const dbParams: DynamoDB.DocumentClient.GetItemInput = {
    //     TableName,
    //     Key: {
    //         deviceId: event.arguments.deviceId
    //     }
    // };
    //
    // try {
    //     const data = await dynamodb.get(dbParams).promise();
    //     logger.info('Successfully got device:', data.Item);
    //     return data.Item;
    // } catch (err) {
    //     logger.error('ERROR:', err);
    //     return err;
    // }
}