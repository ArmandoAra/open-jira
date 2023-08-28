import { Entry } from '@/interfaces';
import mongoose, { Schema, Model } from 'mongoose';


export interface InterfaceEntry extends Entry { };

const entrySchema = new Schema({
    description: { type: String, required: true },
    created_at: { type: Number, required: true },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'done'],
            mesage: '{VALUE} is not supported'
        },
        default: 'pending' //Si no especifico en valor, entonces sera pending por defecto
    },
});

const EntryModel: Model<InterfaceEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);



export default EntryModel;