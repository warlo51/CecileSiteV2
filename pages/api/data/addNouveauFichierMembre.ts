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
    const objetRequest: any = {
        createAt: new Date()
    }
    if(data.fichier.length !== 0){
        await mongodb.db().collection(`Membres`).updateOne(
            { idMembre: data.idMembre },
            {
                $push: {
                    fichier: {
                        $each: data.fichier.map((fichier: any)=>{
                            return {lien:fichier.lien, titre:fichier.titre}
                        }),
                    }
                }
            }
        );
    }

    res.status(200).send({data: "Ok"});
}
