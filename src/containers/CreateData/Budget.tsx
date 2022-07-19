import { Avatar, Box, Button, Container, createTheme, CssBaseline, Dialog, Select, MenuItem, TextField, ThemeProvider } from "@mui/material"
import moment from "moment";

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export interface CreateBudgetFormCompProps {

}

function CreateBudgetFormComp(props: CreateBudgetFormCompProps) {

    const navigator = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [moneny, setMoneny] = useState(0);
    const [remark, setRemark] = useState<string>("");


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
                            id="budget.title.value"
                            name="budget.title.value"
                            autoComplete="my-property-data.budget.title.value"
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
                            id="budget.moneny.value"
                            name="budget.moneny.value"
                            autoComplete="my-property-data.budget.moneny.value"
                            autoFocus
                            label={"金额"}
                            value={moneny}
                            onChange={(e) => setMoneny(+e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="budget.remark.value"
                            name="budget.remark.value"
                            autoComplete="my-property-data.budget.remark.value"
                            autoFocus
                            label={"备注"}
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            variant={isValueError ? "filled" : "outlined"}
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}> 添加 </Button>
                    </Box>
                </Container>
            </ThemeProvider>

        </div >
    )
}

function CreateBudgetFormDialog() {
    return (
        <CreateBudgetFormComp />
    );
}

export { CreateBudgetFormComp, CreateBudgetFormDialog }