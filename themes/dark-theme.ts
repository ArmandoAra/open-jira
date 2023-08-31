import { createTheme, Typography } from '@mui/material';
import { red } from "@mui/material/colors";
import { Color } from '../../next-pokemon/interfaces/descriptionData';


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#558A1B'
        },
        secondary: {
            main: '#313131',
        },
        error: {
            main: red[500],
        }
    },
    // Para estandarizar como se ven los componentes de material-ui en el theme que se esta realizando
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 20,
            },
            styleOverrides: {
                root: {
                    background: '#313131',
                    color: '#558A1B',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: '#313131',
                    color: '#0c0c0d',
                },
            },

        }
    }
})
