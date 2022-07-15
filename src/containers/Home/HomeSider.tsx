import React from "react";
import MuiDrawer from '@mui/material/Drawer';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText, styled, SvgIcon, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { Dashboard as DashboardIcon, Menu, ChevronLeft, Notifications } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from "../../reducers";
import { selectIsMenuCollapsed, toggleMenuCollapsed } from "../../reducers/app";
import { menus, IMenu } from '../../utils/routes'
import { Link } from "react-router-dom";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const MenuItemComp = (menus: Array<IMenu>) => {
    return (
        <List>
            <React.Fragment>
                {menus.map((i: IMenu) => {
                    return (
                        <Link to={i.path} key={i.key}>
                            <ListItemButton >
                                <ListItemIcon color="primary">
                                    {i.icon}
                                </ListItemIcon>
                                <ListItemText primary={i.title} sx={{ color: "ButtonText" }} />
                            </ListItemButton>
                        </Link>
                    )
                })}
            </React.Fragment>
        </List>
    )
}

const HomeSider = () => {

    const isMenuCollapsed = useAppSelector(selectIsMenuCollapsed);
    const dispatch = useAppDispatch();

    const toggleMenuAction = () => {
        dispatch(toggleMenuCollapsed())
    };

    return (
        <Drawer variant="permanent" open={!isMenuCollapsed}>

            <Toolbar sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1]
            }}>
                <IconButton onClick={toggleMenuAction}>
                    Im Icon
                </IconButton>
            </Toolbar>

            {MenuItemComp(menus)}
        </Drawer>
    );
}
export { HomeSider }