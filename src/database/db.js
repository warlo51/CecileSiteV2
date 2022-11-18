import AWS from "aws-sdk";
import DynamoDB from "aws-sdk/clients/dynamodb.js";

// Update AWS config
AWS.config.update({
    accessKeyId: 'AKIAYWEDAZWFDIDG6FCA', // Do NOT HARD-CODE your secret credentials here
    secretAccessKey: 'P25Ep95DdkPf9+fMEsYDl4wmL+d9+jJfbG04ChD2', // Do NOT HARD-CODE your secret credentials here
    region: "eu-west-3",
});

// Create DynamoDB service object
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "latest" });

export default db;
