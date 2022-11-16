import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const dataReceived = await mongodb.db().collection(`Produits`).find().toArray();
    res.status(200).send({data: dataReceived});
}
