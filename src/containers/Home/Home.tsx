import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box, createTheme, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { HomeSider } from "./HomeSider";
import { HomeBar } from "./HomeBar";
import DashBoard from "../DashBoard";
import { AccountBoard } from "../Account";
import { TagBoard } from "../Tag";
import { BudgetBoard } from "../Budget";
import { FlowBoard } from "../Flow";

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
                        <Route path="account/" element={< AccountBoard />} />
                        <Route path="tag/" element={< TagBoard />} />
                        <Route path="budget/" element={< BudgetBoard />} />
                        <Route path="flow/" element={< FlowBoard />} />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider >
    )
}

export { Home };