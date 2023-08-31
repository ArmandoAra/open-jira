
import type { AppProps } from 'next/app'
import { UIProvider } from '@/context/ui'
import { lightTheme, darkTheme } from '@/themes'


import { SnackbarProvider } from 'notistack'
import { EntriesProvider } from '@/context/entries'
import { CssBaseline, ThemeProvider } from '@mui/material'


import '@/styles/globals.css'




export default function App({ Component, pageProps }: AppProps) {

  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider >
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}
