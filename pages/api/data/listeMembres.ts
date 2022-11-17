import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Set desired value here
            responseLimit: '100mb',
        }
    }
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();

    const dataReceived = await mongodb.db().collection(`Membres`).find().toArray();
    res.status(200).send({data: dataReceived});
}
