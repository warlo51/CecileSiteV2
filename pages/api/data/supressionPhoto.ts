import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body.arrayOfPhotoToDelete;

    if(data.length !== 0) {
        const dataReceived = await mongodb.db().collection(`ImageRandom`).deleteMany({idPhoto: { $in: data}});
    }
    res.status(200).send({data: "Ok"});
}
