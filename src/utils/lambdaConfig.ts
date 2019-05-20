import {DynamoDB} from "aws-sdk";

/*
Sets up DynamoDB for Jest test env or Lambda execution env
 */
export const configureDynamoDB = () => {
    if (process.env.JEST_WORKER_ID !== undefined) {
        return new DynamoDB.DocumentClient({
            endpoint: "http://localhost:8000",
            region: "ap-southeast-2"
        });
    } else {
        return new DynamoDB.DocumentClient();
    }
}