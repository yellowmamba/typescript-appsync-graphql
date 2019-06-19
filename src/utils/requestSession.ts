import { configureDynamoDB } from './lambdaConfig'
import { DynamoDB } from 'aws-sdk'

// Expiry request session data after 24 hours
const REQUEST_EXPIRY_SECONDS = 86400

interface RequestSessionData {
    pk: string,
    timestamp: number,
    expiry: number,
    user: any
}

/**
 * Stores user data from AWS Cognito for an AppSync request in the request session cache table
 * @param tableName name of the Requests Session DynamoDB table
 * @param requestTraceId request traceId from AppSync in the request header
 * @param user user information returned from Cognito
 */
export const updateRequestSession = async (tableName: string, requestTraceId: string, user: any) => {
    const requestSessionDynamodb = configureDynamoDB();
    const requestTimestamp: number = new Date().getTime()

    const requestData: RequestSessionData = {
        pk: requestTraceId,
        timestamp: requestTimestamp,
        expiry: requestTimestamp + REQUEST_EXPIRY_SECONDS,
        user: user
    }

    const dbParams: DynamoDB.DocumentClient.PutItemInput = {
        TableName: tableName,
        Item: requestData
    };

    await requestSessionDynamodb.put(dbParams).promise();
}

export const getUserFromRequestSession = async (tableName: string, requestTraceId: string) => {
    const requestSessionDynamodb = configureDynamoDB();
    const dbParams: DynamoDB.DocumentClient.GetItemInput = {
        TableName: tableName,
        Key: {
            pk: requestTraceId
        }
    };
    const data = await requestSessionDynamodb.get(dbParams).promise()
    if (data.Item) {
        return data.Item.user
    } else {
        return null
    }
}