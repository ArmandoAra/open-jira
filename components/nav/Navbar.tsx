import { AppBar, Toolbar } from "@mui/material"

import Link from 'next/link'


export const Navbar = () => {

    return (
        <AppBar position="sticky" >
            <Toolbar>
                <Link href="/" style={{ textDecoration: 'none', fontSize: '1.3rem', color: '#fff' }}>My Open Jira</Link>
            </Toolbar>
        </AppBar>
    )
}


