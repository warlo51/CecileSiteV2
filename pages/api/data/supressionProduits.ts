import { NextApiRequest, NextApiResponse } from "next";
import {getDatabase} from "../../../src/database/database";
import db from "../../../src/database/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const mongodb = await getDatabase();
    const data = req.body.id;
    const paramsAll = {
        TableName: "Produits",
        Key:{
            idProduits: data
        }
    }

    try{
        const data = await db.delete(paramsAll).promise();
        res.status(200).send({data: "Ok"});
    }catch (err){
        console.log(err)
    }

}
