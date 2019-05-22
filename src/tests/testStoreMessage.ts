import {
    StoreMessageEventInput,
    handler
} from '../storeMessage'

import {
    initMessagesDb,
    teardownDb
} from './testUtils/localDynamodb'


describe("handler", () => {

    const TableName = process.env.MESSAGES_DYNAMODB_TABLE || '';

    beforeEach(async () => {
        jest.setTimeout(10000);
        return initMessagesDb(TableName);
    });

    afterEach(async () => {
        teardownDb(TableName);
    });

    test('handler', async () => {

        const startTime = new Date().getTime();
        const mockEvent: StoreMessageEventInput = {
            "arguments": {
                "deviceId": "F1234",
                "message": "Test Message",
                "messageType": "Test Message Type"
            }
        };

        return handler(mockEvent).then(result => {
            expect(result.deviceId).toEqual("F1234");
            expect(result.message).toEqual("Test Message");
            expect(result.messageType).toEqual("Test Message Type");
            expect(result.timestamp).toBeGreaterThanOrEqual(startTime);
        })
    });
});
