import { useContext } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { UIContext } from "@/context/ui";

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts']

export const Sidebar = () => {

    // Para usar el context y modificar el estado de la barra lateral
    // use context me permite desestructurar el valor que se encuentra en el context, que hemos definido en el archivo ui.tsx(el estado del sideMenuOpen: boolean)
    const { sideMenuOpen, closeSideBar } = useContext(UIContext)


    return (
        <Drawer
            anchor="left"
            open={sideMenuOpen}
            onClose={closeSideBar}

        >
            <Box sx={{ width: 240 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">Menu</Typography>
                </Box>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <ArchiveOutlinedIcon /> : <MailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }

                </List>

                <Divider />

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <ArchiveOutlinedIcon /> : <MailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }

                </List>

            </Box>

        </Drawer>
    )
}
