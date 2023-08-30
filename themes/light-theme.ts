import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { Component } from "react";


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#dadada',
        },
        primary: {
            main: '#4a148c',
        },
        secondary: {
            main: '#19859b',
        },
        error: {
            main: red[500],
        }
    },
    // Para estandarizar como se ven los componentes de material-ui
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    background: '#837f85',
                    color: '#070202',
                },
            },
        },
    }
})