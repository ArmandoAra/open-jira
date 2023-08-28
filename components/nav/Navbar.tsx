import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from "react";
import { UIContext } from "@/context/ui";

import Link from 'next/link'

export const Navbar = () => {

    const { openSideBar } = useContext(UIContext)

    return (
        <AppBar position="sticky" >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    onClick={openSideBar}
                >
                    <MenuOutlinedIcon />
                </IconButton>
                <Link href="/" style={{ textDecoration: 'none', fontSize: '1.3rem' }}>Open Jira</Link>
            </Toolbar>
        </AppBar>
    )
}


