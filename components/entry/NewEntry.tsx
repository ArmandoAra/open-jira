
import { ChangeEvent, useContext, useState } from 'react';

// MUI
import { Box, Button, TextField } from '@mui/material'

// Icons
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

// Context
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';


export const NewEntry = () => {

    // Manejando el formulario
    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const onTextFielChange = (event: ChangeEvent<HTMLInputElement>) => { setInputValue(event.target.value) }

    // Acceder al contexto desestructurando la funcion addEntry del EntriesContext
    const { addEntry } = useContext(EntriesContext)
    const { isAdding, setIsAddingEntryStatus } = useContext(UIContext)

    const toggleIsAdding = () => {
        setIsAddingEntryStatus(!isAdding)
        setTouched(false)
    }

    //Guardar la entrada
    const saveEntry = () => {
        if (inputValue.length > 0) {
            addEntry(inputValue)
            setInputValue('')
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {
                isAdding ?
                    <Box sx={{ display: 'flex', width: '50vw', flexDirection: 'column' }}>
                        <TextField
                            label='New Entry'
                            placeholder='Write a new entry'
                            autoFocus
                            multiline
                            rows={2}
                            variant='outlined'
                            color='secondary'
                            error={inputValue.length <= 0 && touched}
                            // helperText={inputValue.length <= 0 && touched ? 'Please write a new entry' : ''}
                            value={inputValue}
                            onChange={onTextFielChange}
                            onBlur={() => { setTouched(true) }} //Cuando pierde el foco


                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', margin: '10px 0' }}>
                            <Button variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />} onClick={saveEntry} >Save</Button>
                            <Button variant='outlined' sx={{ 'color': '#f50057' }} endIcon={<ClearOutlinedIcon />} onClick={toggleIsAdding}>Cancel</Button>
                        </Box>
                    </Box>
                    :

                    <Button
                        fullWidth
                        variant='outlined'
                        color='primary'
                        endIcon={<NoteAddOutlinedIcon />}
                        sx={{ margin: '10px 0' }}
                        onClick={toggleIsAdding}
                    >
                        New Task
                    </Button>
            }


        </Box>
    )
}
