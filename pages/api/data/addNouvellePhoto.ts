import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body;

    if(data.lien !== undefined){
        const dataReceived = await mongodb.db().collection(`ImageRandom`).insertOne({
            lien:data.lien,
            idPhoto:data.idPhoto
        });
    }

    res.status(200).send({data: "Ok"});
}
