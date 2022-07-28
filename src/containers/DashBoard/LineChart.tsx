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
                    >
                        {data.xtitle}
                    </XAxis>
                    <YAxis
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                            }}
                        >
                            {data.ytitle}
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="y"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export { LineChartComp }