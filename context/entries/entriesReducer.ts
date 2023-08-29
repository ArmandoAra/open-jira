// Este uiReducer se va a colocar en el Provider de UIState, para que todos los componentes que esten dentro del provider puedan acceder al state y a las funciones que modifican el state


// Recibe un estado y una acción y devuelve un nuevo estado,No se permiten hacer mutaciones del estado,
// El estado es inmutable, por lo que no se puede modificar directamente
// Se debe crear un nuevo estado a partir del anterior
// El reducer no es asincrono, por lo que no se puede usar async/await


import { Entry } from "@/interfaces";
import { EntriesState } from '.';


// la accion le va a decir al reducer que modificacion se debe hacer en el state, el payload es la informacion que se necesita para hacer la modificacion
type EntriesActionType =
    | { type: 'ADD-ENTRY', payload: Entry }
    | { type: 'ENTRY-UPDATED', payload: Entry }
    | { type: 'DELETE-ENTRY', payload: Entry[] }
    | { type: 'INITIAL-ENTRIES-DB', payload: Entry[] }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case 'ADD-ENTRY':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case 'ENTRY-UPDATED':
            return {
                ...state,

                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }
        case 'DELETE-ENTRY':
            return {
                ...state,
                entries: [...action.payload]
            }
        case 'INITIAL-ENTRIES-DB':
            return {
                ...state,
                entries: [...action.payload]
            }


        default:
            // regresar el estado sin modificar
            return state;
    }
}


