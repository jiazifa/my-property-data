import { createTheme, Grid, Typography } from "@mui/material"
import React from "react";
import { Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


export declare interface LineCharData {
    title: string;
    ytitle?: string;
    xtitle?: string;
    limit: [number?, number?]
    values?: Array<[number, number | string]>
}

function LineChartComp(data: LineCharData) {

    const theme = createTheme();

    const vs = data.values?.map((i) => { return { y: i[0], x: i[1] } })
    return (
        <React.Fragment>
            <ResponsiveContainer>
                <LineChart
                    data={vs}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="x"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        {data.xtitle}
                    </XAxis>
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            {data.ytitle}
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="y"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export { LineChartComp }