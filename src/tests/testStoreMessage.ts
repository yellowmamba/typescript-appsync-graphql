// import {
//     EventInput,
//     handler
// } from '../resolvers/storeMessage'
// import AWS from "aws-sdk"

// const ddbClient = new AWS.DynamoDB({
//   endpoint: "http://localhost:8000",
// })
//
//
// describe("handler", () => {
//
//     beforeAll(async () => {
//
//         jest.setTimeout(60000);
//
//         const tableName = process.env.DYNAMODB_TABLE || "";
//
//         try {
//           await ddbClient.deleteTable({TableName: tableName}).promise()
//         } catch (err) {
//           if (err && err.code !== "ResourceNotFoundException") {
//             throw err
//           }
//         }
//
//         await ddbClient.waitFor("tableNotExists", {
//           TableName: tableName,
//         }).promise()
//
//         const createParams: AWS.DynamoDB.Types.CreateTableInput = {
//           TableName: tableName,
//           AttributeDefinitions: [
//             {AttributeName: "deviceId", AttributeType: "S"},
//             {AttributeName: "timestamp", AttributeType: "N"},
//           ],
//           KeySchema: [
//             {AttributeName: "deviceId", KeyType: "HASH"},
//             {AttributeName: "timestamp", KeyType: "RANGE"},
//           ],
//           ProvisionedThroughput: {
//             ReadCapacityUnits: 2,
//             WriteCapacityUnits: 2,
//           },
//         }
//
//         try {
//           await ddbClient.createTable(createParams).promise()
//         } catch (err) {
//           if (err && err.code !== "ResourceInUseException") {
//             throw err
//           }
//         }
//
//         await ddbClient.waitFor("tableExists", {
//           TableName: tableName,
//         }).promise();
//
//     });
//
//
//
//     test('handler', async () => {
//
//
//         const startTime = new Date().getTime();
//         const mockContext = {};
//
//         const mockEvent: EventInput = {
//             "field": "storeMessage",
//             "arguments": {
//                 "deviceId": "F1234",
//                 "message": "Test Message",
//                 "messageType": "Test Message Type"
//             }
//         };
//
//         return handler(mockEvent, mockContext).then(result => {
//             expect(result.deviceId).toEqual("F1234");
//             expect(result.message).toEqual("Test Message");
//             expect(result.messageType).toEqual("Test Message Type");
//             expect(result.timestamp).toBeGreaterThan(startTime);
//         })
//     });
//
// });
