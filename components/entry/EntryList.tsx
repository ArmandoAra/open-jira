import { FC, useContext, useMemo, DragEvent } from "react";

// Material UI
import { List, Paper } from "@mui/material"
import { EntryStatus } from "@/interfaces";

// Context
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

// Components
import { EntryCard } from "./";

// Styles
import styles from './styles/entryList.module.css'


// Interfaces
interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    // Esto lo debemos memorizar para que react no este renderizando siempre el componente a menos que haya un cambio en el estado
    // useMemo recibe una funcion y un arreglo de dependencias que va a estar escuchando para saber si debe volver a ejecutar la funcion dependiendo si la dependencia cambia su valor 
    const filteredEntriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status])

    // Funcion para permitir el drop
    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    // Funcion para cuando se suelta el elemento
    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        //Obtener el id del elemento que estamos arrastrando 
        const entryId = event.dataTransfer.getData('text');

        // Buscar la entrada en el estado
        if (entries.length > 0) {
            const entryFound = entries.find(entry => entry._id === entryId);
            entryFound!.status = status; //Va a ser igual al status que recibimos por los propertiess
            updateEntry(entryFound!) // El signo de admiracion es para decirle a typescript que estamos seguros que la entrada existe
        }
        //Hacemos el endDragging para que se quite el efecto de opacidad
        endDragging();
    }

    return (
        // Aqui haremos el drop
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper className={styles.paper} >
                {/* Cambiara dependiendo si estoy haciendo un drag o no */}
                <List className={isDragging ? styles.listMediumOpacity : styles.listNormalOpacity}>
                    {/* Aqui van a ir las tareas */}
                    {
                        filteredEntriesByStatus.map(entry => (
                            <EntryCard
                                key={entry._id}
                                entry={entry}
                            />
                        )
                        )
                    }
                </List>
            </Paper>
        </div>
    )
}
