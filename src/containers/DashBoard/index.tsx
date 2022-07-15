import { Container, Grid, Link, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../reducers";
import { LineCharData, LineChartComp } from "./LineChart";

// const data: LineCharData = {
//     title: "v1",
//     limit: [240, 420],
//     values: [
//         [572, '2022-02-17'],
//         [282, '2022-03-17'],
//         [443, '2022-04-17'],
//     ]
// }

function Deposits() {
    return (
        <React.Fragment>
            <Typography component="p" variant="h4" gutterBottom>
                预警指标
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 10 2021
            </Typography>
            <div>
                <Link color="primary" underline="none">
                    View
                </Link>
            </div>
        </React.Fragment>
    );
}

function DashBoard() {
    // const allHealthData = useAppSelector(selectHealthSections);
    // const dispatch = useAppDispatch();


    // const values = [];

    // const data: LineCharData = {
    //     title: "v1",
    //     limit: [240, 420],
    //     values: values
    // }

    return (
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 440
                    }}>
                        {/* {LineChartComp(data)} */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DashBoard;