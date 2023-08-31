import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react"
import { Navbar } from "../nav"


interface LayoutProps {
    title?: string,
    children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ title, children }) => {
    return (
        //El sx es para darle estilos de forma inline pero tiene acceso a los themes
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title ? title : 'My Open Jira'}</title>
            </Head>

            {/* NavBar and Sidebar */}
            <Navbar />

            <Box component='main' sx={{ padding: '10px 20px' }}>
                {children}
            </Box>
        </Box>
    )
}
