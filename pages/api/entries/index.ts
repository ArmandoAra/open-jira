import type { NextApiRequest, NextApiResponse } from 'next'

//Connection to database
import { db } from '@/database';
import { EntryModel, InterfaceEntry } from '@/models';
import { Entry } from '@/interfaces';



type Data =
    | { message: string }
    | InterfaceEntry[]
    | InterfaceEntry


export default function handleEnties(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(req, res);
        case 'POST':
            return postEntry(req, res);
        default:
            return res.status(400).json({ message: 'EndPoint not exist' })
    }




}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    //Conexion, pedir los datos y desconectarse
    await db.connectDB();
    const entries = await EntryModel.find().sort({ created_at: 'ascending' });
    await db.disconnectDB();


    return res.status(200).json(entries)
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description } = req.body;

    // Aqui manejamos los datos que queremos escribir en el servidor
    const newEntry = new EntryModel({
        description,
        created_at: Date.now(),
    })

    // Hacemos la conexion a la base de datos,salvamos los datos y nos desconectamos
    try {
        await db.connectDB();
        await newEntry.save();
        await db.disconnectDB();

        return res.status(201).json(newEntry)
    } catch (error) {
        await db.disconnectDB();
        console.log(error);
        return res.status(400).json({ message: 'Error to save data' })
    }

    return res.status(200).json({ message: 'createEntry' })
}