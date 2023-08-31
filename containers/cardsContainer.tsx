import { NewEntry, EntryList } from '@/components/entry'
import { Grid, CardHeader, CardContent } from '@mui/material'
import React from 'react'

const cards = [
    ['Pending', 'pending'],
    ['In Progress', 'in-progress'],
    ['Done', 'done'],
]


export const CardsContainer = () => {
    return (
        <Grid >
            <NewEntry />
            <Grid container  >
                {cards.map((card, index) => (
                    <Grid item xs={12} key={index} sm={4} sx={{ height: 'calc(100vh - 100px)' }}>
                        <CardHeader sx={{ display: 'flex', textAlign: 'center', padding: '0px', paddingTop: '10px' }} title={card[0]} />
                        <CardContent>
                            {/* Agregar una nueva entrada */}
                            {/* Listado de las entradas */}
                            <EntryList status={card[1]} />
                        </CardContent>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
