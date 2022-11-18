import AWS from "aws-sdk";
import DynamoDB from "aws-sdk/clients/dynamodb.js";

// Update AWS config
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Do NOT HARD-CODE your secret credentials here
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Do NOT HARD-CODE your secret credentials here
    region: "eu-west-3",
});

// Create DynamoDB service object
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "latest" });

export default db;
