import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body;

    await mongodb.db().collection(`Membres`).updateOne(
        { idMembre: data.idMembre },
        {
            $push: {
                rdv: {
                    $each: [data.date]
                }
            }
        }
    );

    res.status(200).send({data: "Ok"});
}
