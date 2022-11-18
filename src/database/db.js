import AWS from "aws-sdk";
import DynamoDB from "aws-sdk/clients/dynamodb.js";

// Update AWS config
AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_VARIABLE_AWS_ID, // Do NOT HARD-CODE your secret credentials here
    secretAccessKey: process.env.NEXT_PUBLIC_VARIABLE_AWS_SECRET_KEY, // Do NOT HARD-CODE your secret credentials here
    region: "eu-west-3",
});

// Create DynamoDB service object
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "latest" });

export default db;
