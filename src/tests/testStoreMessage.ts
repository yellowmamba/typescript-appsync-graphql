import {
    StoreMessageEventInput,
    handler
} from '../storeMessage'

import {
    initDb,
    teardownDb
} from './testUtils/localDynamodb'


describe("handler", () => {

    beforeAll(async () => {
        jest.setTimeout(60000);
        return initDb();
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

    afterAll(async () => {
        teardownDb();
    });
});
