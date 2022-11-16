import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body.id;

    const dataReceived = await mongodb.db().collection(`Membres`).deleteOne({idMembre:`${data}`});

    res.status(200).send({data: "Ok"});
}
