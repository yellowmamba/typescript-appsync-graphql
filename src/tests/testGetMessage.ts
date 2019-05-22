import {
    GetMessageEventInput,
    handler
} from '../getMessage'

import {
    initMessagesDb,
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

    const TableName = process.env.MESSAGES_DYNAMODB_TABLE || '';

    beforeEach(async () => {
        jest.setTimeout(20000);
        const ddbClient = await initMessagesDb(TableName);

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

    afterEach(async () => {
        teardownDb(TableName);
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
});
