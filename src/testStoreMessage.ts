import {
    EventInput,
    handler
} from './storeMessage'

test('handler', async () => {

    const startTime = new Date().getTime();
    const mockContext = {};

    const mockEvent: EventInput = {
        "field": "storeMessage",
        "arguments": {
            "deviceId": "F1234",
            "message": "Test Message",
            "messageType": "Test Message Type"
        }
    };

    return handler(mockEvent, mockContext).then(result => {
        expect(result.deviceId).toEqual("F1234");
        expect(result.message).toEqual("Test Message");
        expect(result.messageType).toEqual("Test Message Type");
        expect(result.timestamp).toBeGreaterThan(startTime);
    })
});
