import { FC, DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';


// Estilos
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { entryCardStyles } from './styles/entryCard';
import { UIContext } from '@/context/ui';
const { card, descriptionTypography, cardActionsTypography } = entryCardStyles;

// Interface
import { Entry } from '@/interfaces';
interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { _id, description, status } = entry;
    const { isDragging, startDragging, endDragging } = useContext(UIContext);
    const router = useRouter()

    const onDragStart = (event: DragEvent) => {
        console.log('Drag Start', event)
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

    return (
        <Card
            sx={card}
            // Eventos de drag  
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onCardCliked}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={descriptionTypography}>
                        {/* Descripcion */}
                        {description}
                    </Typography>
                </CardContent>
                <CardActions sx={cardActionsTypography}>
                    <Typography variant='body2'>creado hace 1 hora</Typography>
                </CardActions>
            </CardActionArea>

        </Card>
    )
}
