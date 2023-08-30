import { FC, DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';


// MUI
import { Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import { UIContext } from '@/context/ui';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//styles
import styles from './styles/entryCard.module.css'


// Utils
import { dateFunctions } from '@/utils';

// Interface
import { Entry } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { _id, description } = entry;
    const { isDragging, startDragging, endDragging } = useContext(UIContext);
    const router = useRouter()

    const { deleteEntry } = useContext(EntriesContext)

    // Cuando empieza el Drag
    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', _id);

        // Modificar el estato para saber que estamos haciendo drag
        startDragging();
    }

    const onDragEnd = (event: DragEvent) => {
        // Cuando se suelta el elemento se va a ejecutar esta funcion que va a mandar el id del elemento que estamos arrastrando para luego obtenerlo con el onDrop getData('text)
        event.dataTransfer.setData('text', _id);

        // Modificar el estato para saber que estamos haciendo drag
        endDragging();
    }

    const onCardCliked = () => {
        router.push(`/entries/${_id}`)
    }

    const onDelete = () => {
        deleteEntry(entry._id)
        router.push('/')
    }

    return (
        <Card
            className={styles.card}
            // Eventos de drag  
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}

        >
            <CardActionArea sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent
                    onClick={onCardCliked}
                    sx={{ backgroundColor: '#d8d8d8' }}
                >
                    <Typography className={styles.descriptionTypography}>
                        {/* Descripcion */}
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className={styles.cardActionsTypography} >
                    <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.created_at)}</Typography>

                    <IconButton sx={{
                        display: 'flex',
                        backgroundColor: 'error.dark',
                    }}
                        onClick={onDelete}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </CardActions>
            </CardActionArea>

        </Card>
    )
}
