import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
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
                    color: '#fff',
                },
            },
        },
    }
})
