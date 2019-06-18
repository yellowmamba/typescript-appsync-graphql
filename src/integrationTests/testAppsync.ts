// import { GraphQLClient } from 'graphql-request'
// import uuidv4 from "uuid";

// const APPSYNC_ENDPOINT_URL = process.env.APPSYNC_ENDPOINT_URL || '';
// const APPSYNC_API_KEY = process.env.APPSYNC_API_KEY || '';

// const graphQLClient = new GraphQLClient(APPSYNC_ENDPOINT_URL, {
//   headers: {
//     'x-api-key': APPSYNC_API_KEY,
//   },
// })

// const gqlRequest = async (request: string, variables: any) => {
//   return await graphQLClient.request(request, variables)
// }

// describe("appsyncIntegrationTests", () => {

//   const getAllMessagesQuery = `
//    query getAllMessages($deviceId: String!) {
//      allMessages(deviceId:$deviceId) {
//        message,
//        timestamp
//       }
//     }
//   `

//   const getDeviceAndMessagesQuery = `
//    query getDevice($deviceId: String!) {
//      getDevice(deviceId:$deviceId) {
//        deviceName,
//        createdTimestamp,
//        messages {
//         message,
//         messageType
//        }
//       }
//     }
//   `

// const getDeviceInvalidQuery = `
//    query getDevice($deviceId: String!) {
//      getDevice(deviceId:$deviceId) {
//        deviceName,
//        createdTimestamp,
//        messages
//       }
//     }
//   `

//   test('getAllMessagesValid', async () => {

//     const getAllMessagesValidVariables = {
//       deviceId: 'D123',
//     }

//     return gqlRequest(getAllMessagesQuery, getAllMessagesValidVariables)
//         .then(result => {
//           expect(result).toEqual(expect.objectContaining({
//             allMessages: expect.any(Array)
//           }));
//         })
//   });

//   test('getDeviceAndMessagesValid', async () => {

//     const getDeviceVariablesValidDeviceId = {
//       deviceId: 'D123',
//     }

//     return gqlRequest(getDeviceAndMessagesQuery, getDeviceVariablesValidDeviceId )
//         .then(result => {
//           expect(result).toEqual(expect.objectContaining({
//             getDevice: expect.any(Object)
//           }));
//         })
//   });

//   test('getDeviceAndMessagesValidQueryDoesNotExist', async () => {

//     const getDeviceVariablesInvalidDeviceId  = {
//       deviceId: uuidv4(),
//     }

//     const expectedNullResponse = {
//       "getDevice": null
//     }

//     return gqlRequest(getDeviceAndMessagesQuery, getDeviceVariablesInvalidDeviceId)
//         .then(result => {
//           expect(result).toEqual(expectedNullResponse)
//         })
//   });

//   test('getDeviceInvalidQueryValidDeviceId', async () => {

//     const getDeviceVariablesValidDeviceId = {
//       deviceId: 'D123',
//     }
//     await expect(gqlRequest(getDeviceInvalidQuery, getDeviceVariablesValidDeviceId)).rejects.toThrow()
//   });

//   test('getDeviceInvalidQueryInvalidDeviceId', async () => {

//     const getDeviceVariablesInvalidDeviceId  = {
//       deviceId: uuidv4(),
//     }
//     await expect(gqlRequest(getDeviceInvalidQuery, getDeviceVariablesInvalidDeviceId)).rejects.toThrow()
//   });

// })

