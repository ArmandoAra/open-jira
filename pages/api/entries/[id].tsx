import type { NextApiRequest, NextApiResponse } from 'next'

import mongoose from 'mongoose'
import { connectDB, disconnectDB } from '@/database/db'

import { EntryModel, InterfaceEntry } from '@/models'

type Data =
    | { message: string }
    | InterfaceEntry




export default function handleIDs(req: NextApiRequest, res: NextApiResponse<Data>) {
    //Tomamos el id de la request, siempre son strings
    const { id } = req.query

    // validamos que el id sea un id de mongo
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID' + id })
    }

    switch (req.method) {
        case 'GET':
            return getEntryById(req, res)
        case 'PUT':
            return updateEntry(req, res)
        case 'DELETE':
            return deleteEntry(req, res)
        default:
            return res.status(400).json({ message: 'Invalid ID' + id })
    }
}

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query

    try {
        await connectDB();
        const entryExist = await EntryModel.findById(id)
        await disconnectDB();
        res.status(200).json(entryExist!)

    } catch (error) {
        await disconnectDB();
        res.status(400).json({ message: 'Something wrong to get the ID' })
    }

}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query
    try {
        await connectDB();
        const entryExist = await EntryModel.findByIdAndDelete(id)
        await disconnectDB();
        res.status(200).json(entryExist!)

    } catch (error) {
        await disconnectDB();
        res.status(400).json({ message: 'Something wrong deleting the entry' })
    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query

    await connectDB();
    const entryToUpdate = await EntryModel.findById(id)

    if (!entryToUpdate) {
        await disconnectDB();
        return res.status(400).json({ message: 'There is not ID: ' + id });
    }

    //Estoy creando dos variables, si no es mandada por el request entonces ponemos los valores anteriores que tenian
    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body

    try {
        // Creamos el entry actualizado con los datos que queremos y le decimos que valide que es un estado valido y el new es para que no nos regrese la misma data sino la actualizada
        const updatedEntry = await EntryModel.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await disconnectDB();
        res.status(200).json(updatedEntry!)

    } catch (error) {
        await disconnectDB();
        res.status(400).json({ message: 'Error updating entry' })
    }

}