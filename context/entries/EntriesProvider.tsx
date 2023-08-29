// El provider ayuda a que los componentes hijos puedan acceder a los datos del contexto, 
// es decir, a los datos que se encuentran en el estado global de la aplicación.
// Va a guardar valores booleanos, strings, objetos, etc.

import { useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from '.';
import { Entry } from '@/interfaces';

import { entriesApi } from '@/apis';

import { useSnackbar } from 'notistack';


interface EntriesProviderProps {
    children: React.ReactNode;
}

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider = ({ children }: EntriesProviderProps) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    //Tabajar las notificaciones
    const { enqueueSnackbar } = useSnackbar();

    // Methods
    const addEntry = async (description: string) => {
        try {

            const { data } = await entriesApi.post<Entry>('/entries', { description })

            dispatch({
                type: 'ADD-ENTRY',
                payload: data,
            })
        } catch (error) {
            console.log(error)
        }

    }

    //Recibimos toda la entrada
    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {

        try {
            // Se podria mandar toda la entrada pero es mas costosa en recursos, entonces mandamos solo description y status
            const { data } = await entriesApi.put<Entry>(`entries/${_id}`, { description, status })

            dispatch({ type: 'ENTRY-UPDATED', payload: data, })

            //Notificacion
            if (showSnackbar) {
                enqueueSnackbar('Saved', {
                    variant: 'success',
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    }
                })
            }

        } catch (error) {
            console.log("Error to update the entry in the Provider")
        }


    }

    const deleteEntry = async (id: string) => {
        try {
            await entriesApi.delete(`/entries/${id}`)
            const { data } = await entriesApi.get<Entry[]>('/entries')
            dispatch({ type: 'DELETE-ENTRY', payload: data })
        }
        catch (e) {
            console.log(e)
        }

    }

    // Leyendo los datos del bake-end para ver los entries que tenemos
    const readingEntries = async () => {

        try {
            const { data } = await entriesApi.get<Entry[]>('/entries')
            dispatch({ type: 'INITIAL-ENTRIES-DB', payload: data, })

        } catch (error) {
            return console.log("Error reading Entries")
        }

    }


    useEffect(() => {
        readingEntries()
    }, [])


    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methohs
            addEntry,
            updateEntry,
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

