import {
    GetMessageEventInput,
    handler
} from '../getMessage'

import {
    initDb,
    teardownDb
} from './testUtils/localDynamodb'
import {DynamoDB} from "aws-sdk";

interface Message {
    deviceId: string,
    timestamp: number,
    message: string,
    messageType: string
}


describe("handler", () => {

    beforeAll(async () => {
        jest.setTimeout(60000);
        const ddbClient = await initDb();
        const TableName = process.env.DYNAMODB_TABLE || '';

        const dbParams: DynamoDB.PutItemInput = {
            TableName,
            Item: {
                "deviceId": {
                    "S": "TestDevice"
                },
                "timestamp": {
                    "N": "1000"
                },
                "message": {
                    "S": "Hello World"
                },
                "messageType": {
                    "S": "Greeting"
                }

            }
        };
        return await ddbClient.putItem(dbParams).promise();
    });

    test('handlerValidEvent', async () => {

        const expectedMessage: Message = {
                deviceId: "TestDevice",
                timestamp: 1000,
                message: "Hello World",
                messageType: "Greeting"
            }

        const mockEvent: GetMessageEventInput = {
            "arguments": {
                "deviceId": "TestDevice",
                "timestamp": 1000
            }
        };

        return handler(mockEvent).then(result => {
            expect(result).toEqual(expectedMessage);
        })
    });

    test('handlerNoDeviceAtTimestamp', async () => {

        const expectedMessage = {}
        const mockEvent: GetMessageEventInput = {
            "arguments": {
                "deviceId": "TestDevice",
                "timestamp": 9000
            }
        };

        return handler(mockEvent).then(result => {
            expect(result).toEqual(expectedMessage);
        })
    });

    test('handlerNoDevice', async () => {

        const expectedMessage = {}
        const mockEvent: GetMessageEventInput = {
            "arguments": {
                "deviceId": "DoesNotExist",
                "timestamp": 1000
            }
        };

        return handler(mockEvent).then(result => {
            expect(result).toEqual(expectedMessage);
        })
    });

    afterAll(async () => {
        teardownDb();
    });
});
