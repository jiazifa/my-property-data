import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Badge, IconButton, styled, Toolbar, Typography } from "@mui/material";
import { Dashboard as DashboardIcon, Menu, ChevronLeft, Notifications } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from "../../reducers";
import { selectIsMenuCollapsed, toggleMenuCollapsed } from "../../reducers/app";
import { selectAppName } from '../../reducers/user';


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const HomeBar = () => {
    const isMenuCollapsed = useAppSelector(selectIsMenuCollapsed);
    const dispatch = useAppDispatch();

    const appTitle = useAppSelector(selectAppName);

    const toggleMenuAction = () => {
        dispatch(toggleMenuCollapsed())
    };

    return (
        <AppBar position="absolute" open={!isMenuCollapsed}>
            <Toolbar sx={{ pr: '24px' }}>
                <IconButton edge='start' color="inherit" aria-label="open drawer" sx={{ marginRight: '36px', }} onClick={toggleMenuAction}>
                    {isMenuCollapsed ? <Menu /> : <ChevronLeft />}
                </IconButton>

                <Typography component='h1' variant="h5" color='inherit' noWrap flexGrow="1">
                    {appTitle}
                </Typography>

                <IconButton color="inherit">
                    <Badge badgeContent={3} color="secondary">
                        <Notifications />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export { HomeBar }