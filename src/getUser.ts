'use strict'

import bunyan from 'bunyan';
import {updateRequestSession} from './utils/requestSession'

const logger = bunyan.createLogger({name: "getUserLambda"});
const RequestSessionTableName = process.env.REQUEST_SESSION_DYNAMODB_TABLE || '';

// TODO: update User to use real properties returned from Cognito
interface User {
    id: string,
    name: string,
    email: string,
    cognitoUsername: string
}

interface GetUserEventInput {
    identity: any,
    request: any
}

/**
* Returns a mock user. This function simulates a call to AWS Cognito.
* It would use the identity information from AppSync to authenticate a user and get their details.
*/
const getUserFromCognito = async (identity: any): Promise<User> => {
    // Mock the call to Cognito taking 500ms to complete
    await new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 500)
    })
    return {
        id: "mockId123",
        name: "mockUser",
        email: "mockUser@gmail.com",
        cognitoUsername: "cognito-user-1"
    }
}


/*
AppSync pipeline resolver function that authenticates a user against AWS Cognito
 */
export const handler = async (event: GetUserEventInput) => {
    logger.info(event);
    const requestTraceId: string = event.request.headers['x-amzn-trace-id']
    const user: User = await getUserFromCognito(event.identity)
    logger.info({
        table: RequestSessionTableName,
        traceId: requestTraceId,
        user: user
    });
    await updateRequestSession(RequestSessionTableName, requestTraceId, user)
}