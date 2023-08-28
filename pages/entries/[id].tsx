import React, { ChangeEvent, useMemo, useState, FC, useContext } from 'react'
import { GetServerSideProps } from 'next';

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EntriesContext } from '@/context/entries';

import { Layout } from '@/components/layouts';
import { Entry, EntryStatus } from '@/interfaces';

import { isValidObjectId } from 'mongoose';
import { getEntryById } from '@/database';


const validStatus: EntryStatus[] = ["pending", "in-progress", "done"]


//Esta interface no va a inferir en los datos que vamos a recibir en las properties que vienen del server side props
interface Props {
    entry: Entry
}

//Interface del box de notificacion de Save
interface State extends SnackbarOrigin {
    open: boolean;
}

export const EntryPage: FC<Props> = ({ entry }) => {

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState<boolean>(false)

    //Accedemos al context, y desestructuramos algo que viene de nuestro EntriesContext
    const { updateEntry } = useContext(EntriesContext)

    //guardando en memoria para optimizar rendimiento
    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    //Esta es la misma funcion que estamos usando en el newEntries del componente asi que podemos refactorizar
    const onTextFielChange = (event: ChangeEvent<HTMLInputElement>) => { setInputValue(event.target.value) }

    /* Manejando Los radio botones */
    const onStatusCanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.target.value
        setStatus(newStatus as EntryStatus)

    }

    /* Manejando el boton de Save */
    const onSave = (newState: SnackbarOrigin) => {
        if (inputValue.trim().length === 0) {
            return;
        }
        //La informacion que voy a mandar es la que se guarda en el useState
        const updatedEntry: Entry = {
            ...entry,
            status: status,
            description: inputValue,
        }
        setStateNotice({ ...newState, open: true });
        updateEntry(updatedEntry);
    }

    //Snackbar(codigo de notificacion de save)
    const [stateNotice, setStateNotice] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = stateNotice;


    return (
        <Layout title={inputValue.length > 10 ? inputValue.substring(0, 12) + '...' : inputValue}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title='Entrada'
                            subheader={`Created : ${entry.created_at}`}
                        />
                        <CardContent >
                            <TextField sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='New entry'
                                autoFocus
                                multiline
                                label='New entry'
                                value={inputValue}
                                onBlur={() => setTouched(true)}
                                onChange={onTextFielChange}
                                helperText={isNotValid && 'Write a text before save'}
                                error={isNotValid}
                            />

                            <FormControl>
                                <FormLabel>
                                    State:
                                </FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusCanged}
                                >
                                    {
                                        validStatus.map(status => (
                                            <FormControlLabel
                                                key={status}
                                                value={status}
                                                control={<Radio />}
                                                label={capitalize(status)}

                                            />
                                        ))
                                    }
                                </RadioGroup>

                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveAltOutlinedIcon />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length === 0}
                            >
                                save
                            </Button>
                        </CardActions>



                    </Card>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="I love snacks"
                    key={vertical + horizontal}
                />
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark',
            }}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Layout>
    );

};

// You should use getServerSideProps when:
//- Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // const { id } = ctx.params as { id: string}
    const { id } = params as { id: string }
    const entry = await getEntryById(id)

    if (!isValidObjectId(id)) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;