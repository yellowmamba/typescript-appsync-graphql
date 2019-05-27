'use strict'

import bunyan from 'bunyan';

const logger = bunyan.createLogger({name: "getUserLambda"});

// TODO: update User to use real properties returned from Cognito
interface User {
    id: string,
    name: string,
    email: string,
    cognitoUsername: string
}

interface GetUserEventInput {
    identity: any
}

// TODO: update function to call Cognito
/**
 * Returns a mock user. This function simulates a call to AWS Cognito.
 * It would use the identity information from AppSync to authenticate a user and get their details.
 * @param identity
 */
const getAuthenticatedUser = async (identity: any): Promise<User> => {
    logger.info({identity}, "Authenticating user")

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
export const handler = async (event: GetUserEventInput): Promise<User> => {
    logger.info(event);
    return await getAuthenticatedUser(event.identity)
}