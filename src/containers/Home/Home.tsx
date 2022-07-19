import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Container, createTheme, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { HomeSider } from "./HomeSider";
import { HomeBar } from "./HomeBar";
import DashBoard from "../DashBoard";
import { CreateDataBoard } from "../CreateData";
import { AccountBoard } from "../Account";

const mdTheme = createTheme();

const Home = () => {
    return (
        <ThemeProvider theme={mdTheme}>
            <Box display='flex'>
                <CssBaseline />

                <HomeBar />
                <HomeSider />

                <Box component="main" sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}>
                    <Toolbar />
                    <Routes>
                        <Route path="dashboard/" element={<DashBoard />} />
                        <Route path="createHealthDataBoard/" element={<CreateDataBoard />} />
                        <Route path="account/" element={< AccountBoard />} />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider >
    )
}

export { Home };