import { Avatar, Box, Button, Container, createTheme, CssBaseline, Dialog, Select, MenuItem, TextField, ThemeProvider, FormControl, InputLabel } from "@mui/material"
import moment from "moment";

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export interface CreateFlowFormCompProps {

}

const budgetModels = [
    {
        id: 1,
        name: "11月"
    },
    {
        id: 2,
        name: "12月"
    }
]

function CreateFlowFormComp(props: CreateFlowFormCompProps) {

    const navigator = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [moneny, setMoneny] = useState(0);
    const [remark, setRemark] = useState<string>("");
    const [budgetId, setBudgetId] = useState<number>(1);

    const BudgetSelectMenu: Array<React.ReactNode> = budgetModels
        .map((model) => <MenuItem key={model.name} value={model.id}>{model.name}</MenuItem>);

    const handleComfirm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let v = Number(title);
        let time = date;
    }, []);

    const isValueError = !(title.length >= 0);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component='main' maxWidth="xs">
                    <Box component='form' onSubmit={handleComfirm} sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Flow.title.value"
                            name="Flow.title.value"
                            autoComplete="my-property-data.Flow.title.value"
                            autoFocus
                            label={"标题"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Flow.moneny.value"
                            name="Flow.moneny.value"
                            autoComplete="my-property-data.Flow.moneny.value"
                            autoFocus
                            label={"金额"}
                            value={moneny}
                            onChange={(e) => setMoneny(+e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="Flow.remark.value"
                            name="Flow.remark.value"
                            autoComplete="my-property-data.Flow.remark.value"
                            autoFocus
                            label={"备注"}
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="flow.budget">消耗预算项</InputLabel>
                            <Select
                                labelId="flow.budget"
                                id="flow.budget"
                                value={budgetId}
                                onChange={(e) => console.log(e.target.value)}
                            >
                                {BudgetSelectMenu}
                            </Select>
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}> 添加 </Button>
                    </Box>
                </Container>
            </ThemeProvider>

        </div >
    )
}

function CreateFlowFormDialog() {
    return (
        <CreateFlowFormComp />
    );
}

export { CreateFlowFormComp, CreateFlowFormDialog }